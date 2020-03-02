const express = require('express');
const fs = require('fs').promises;
const glob = require('glob-promise').promise;
const multer = require('multer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const CONF = require('../conf.js')();
const Logger = require('./logger.js');
const { fileExists, getIsoDate, loadJson, writeJson, parsePath } = require('./util.js');
const { ServerError } = require('./errors.js');
const { Video } = require('./video.js');

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
        this.setupOutput();
    }

    async getVideo(id) {
        const video = new Video(id);
        return await video.getData();
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
        const startTime = Date.now();
        const video = new Video(id);
        await video.getData();

        const input = video.uploadFilePath;
        const output = video.outputFilePath;
        const target = video.targetVideo;

        this.log(`Swapping ${input} on ${target} as ${output}`);

        const cmd = `facetool swap -i ${input} -t ${target} -o ${output} -if --only-mouth`;
        const { stdout, stderr } = await exec(cmd);
        console.log(stdout, stderr);

        // Also write the moment we have swapped this file and total time it took
        const data = video.data.uploadData;
        data.swapTime = (Date.now() - startTime) / 1000;
        data.swapDate = (new Date()).toISOString();
        writeJson(video.outputDataPath, data);

        this.log(`${id} has been swapped`);
    }

    run() {
        this.server.listen(this.port, () => {
            this.log(`listening on *:${this.port}`);

            this.io.on('connection', (socket) => {
                this.log('connected!');

                socket.on('clientlog', (msg) => {
                    this.log('clientlog:' + msg);
                });

                socket.on('recorder', (msg) => {
                    this.log('recorder:' + msg);
                    this.io.emit('recorder', msg);
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
                console.error(e);
                res.status(e.status).send(e.message);
            }

            res.send(info);
        });
    }

    setupOutput() {
        this.app.get('/output', async (req, res) => {
            const ext = CONF.server.output_video_extension;
            const path = CONF.server.output_path;
            const videos = await glob(`${path}/*.${ext}`);

            // Now loop over the videos and get json data, and
            // return that
            const output = [];

            const ids = videos.map(parsePath).map(p => p.stem);

            for (const id of ids) {
                output.push(await this.getVideo(id));
            }

            res.send(output);
        });
    }

    setupProcess() {
        this.app.get('/process/:id', async (req, res) => {
            try {
                await this.processUpload(req.params.id);
            } catch (e) {
                console.error(e);
                res.send('FAIL');
            }

            this.io.emit('recorder', 'newvideo');

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