const express = require('express');
const fs = require('fs').promises;
const multer = require('multer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const CONF = require('../conf.js')();
const Logger = require('./logger.js');
const { fileExists, getIsoDate, loadJson } = require('./util.js');

class ServerError {
    constructor(e) {
        this.status = e[0];
        this.message = {
            errorcode : e[0],
            error : e[1]
        };
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
        this.setupProcess();
        this.setupInfo();
    }

    async getVideo(id) {
         const uploadPath = CONF.server.upload_path;
         const extension = CONF.server.upload_video_extension;
         const videoPath = `${uploadPath}${id}.${extension}`;
         const dataPath = `${uploadPath}${id}.json`;

         // Check if these files exist
         const videoExists = await fileExists(videoPath);
         const dataExists = await fileExists(dataPath);

         if (!videoExists || !dataExists) {
             throw new ServerError(CONF.errors.video_not_found);
             return;
         }

         const data = await loadJson(dataPath);

         return {
             data, dataPath, videoPath
         };
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
        // const uploadPath = CONF.server.upload_path;
        const outputPath = CONF.server.output_path;
        // const extension = CONF.server.upload_video_extension;

        const inputVideo = await this.getVideo(id);
        const targetVideo = inputVideo.data.targetVideo;

        const input = inputVideo.videoPath;
        const output = `${outputPath}${id}.${CONF.server.output_video_extension}`;
        const target = `${CONF.server.target_path}${targetVideo}.mp4`;

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

    setupInfo() {
        this.app.get('/info/:id', async (req, res) => {
            let info;

            try {
                info = await this.getVideo(req.params.id);
            } catch (e) {
                res.status(e.status).send(e.message);
            }

            res.send(info);
        });
    }

    setupProcess() {
        this.app.get('/process/:id', async (req, res) => {
            try {
                await this.processUpload(req.params.id);
            } catch (e) {
                res.send('FAIL');
            }

            res.send(req.params.id);
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

            res.send(id);
        });
    }
}