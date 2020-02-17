const express = require('express');
const fs = require('fs').promises;
const multer = require('multer');

const CONF = require('../conf.js')();
const Logger = require('./logger.js');
const { getIsoDate } = './util.js';

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
        this.setupUploads();
    }

    async log(msg) {
        this.logger.log(msg);
        this.io.emit('log', msg);
    }

    run() {
        // Main loop
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
        this.app.post('/upload', this.upload.single('video'), (req, res) => {
            this.log('Got a file upload');
            console.log(res);
        });
    }
}