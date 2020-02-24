const express = require('express');
const fs = require('fs').promises;
const multer = require('multer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const CONF = require('../conf.js')();
const Logger = require('./logger.js');
const { getIsoDate } = './util.js';

class ServerError {
    constructor(e) {
        this.status = e[0];
        this.message = e[1];
    }
}

module.exports = class Server {
    constructor({ app, io, server }) {
        this.app = app;
        this.io = io;
        this.server = server;
        this.logger = new Logger(CONF.server.log_path);
        this.port = CONF.server.port;
        this.static = express.static(CONF.server.static_path);
        this.upload = multer({
            dest : CONF.server.upload_path
        });

        this.app.use(this.static);
        this.app.use('/files', express.static(CONF.server.files_path));
        this.setupUploads();
    }

    async handleUpload(file, meta) {
        // TODO: for now we just use the filename as an id, and save that
        // together with the meta. We should use some kind of other
        // mechanism here, pref. backed by a database
        const id = file.filename;

        this.log(`Handling ${id}`);

        // If this is anything else than supported, abort
        const mimetypes = CONF.server.allowed_upload_mimetypes;

        if (!mimetypes.includes(file.mimetype)) {
            throw new ServerError(CONF.errors.invalid_mimetype);
        }

        // Move to extension
        let newPath = file.path + '.' + CONF.server.upload_video_extension;
        await fs.rename(file.path, newPath);
        this.log(`Saved upload as ${newPath}`);

        // And save the config file
        const metaPath = file.path + '.json';
        await fs.writeFile(metaPath, meta);
        this.log(`Saved upload meta as ${metaPath}`);

        return id;
    }

    async log(msg) {
        this.logger.log(msg);
        this.io.emit('log', msg);
    }

    async processUpload(id) {
        this.log(`Process upload: ${id}`);
        const uploadPath = CONF.server.upload_path;
        const outputPath = CONF.server.output_path;
        const extension = CONF.server.upload_video_extension;

        const input = `${uploadPath}${id}.${extension}`;
        const output = `${outputPath}${id}.${CONF.server.output_video_extension}`;
        const target = `${CONF.server.target_path}1.mp4`;

        this.log(`Swapping ${input} on ${target} as ${output}`);

        const cmd = `facetool swap -i ${input} -t ${target} -o ${output} --only-mouth`;
        const { stdout, stderr } = await exec(cmd);

        console.log(stdout, stderr);
    }

    run() {
        this.server.listen(this.port, () => {
            this.log(`listening on *:${this.port}`);

            this.io.on('connection', (socket) => {
                this.log('connected!');

                socket.on('clientlog', (msg) => {
                    this.log('clientlog', msg);
                });
            });
        });
    }

    setupUploads() {
        this.app.post('/upload', this.upload.single('video'), async (req, res, next) => {
            this.log('Got a file upload');
            let id = 'UNDEFINED';

            try {
                id = await this.handleUpload(req.file, req.body.meta);
            } catch(e) {
                res.status(e.status).send(e.message);
            }

            res.send('ok');

            this.processUpload(id);
        });
    }
}