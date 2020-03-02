const CONF = require('../conf.js')();
const { ServerError } = require('./errors.js');
const { fileExists, loadJson } = require('./util.js');

class Video {
    constructor(id) {
        const conf = CONF.server;

        this.uploadFilePath = `${conf.upload_path}/${id}.${conf.upload_video_extension}`;
        this.uploadDataPath = `${conf.upload_path}/${id}.json`;
        this.outputFilePath = `${conf.output_path}/${id}.${conf.output_video_extension}`;
        this.outputDataPath = `${conf.output_path}/${id}.json`;
        this.data = null;
    }

    async getData() {
        const outputExists = await this.outputExists();
        const uploadExists = await this.uploadExists();
        const data = { outputExists, uploadExists };

        if (outputExists) {
            data.outputData = await loadJson(this.outputDataPath);
        }

        if (uploadExists) {
            data.uploadData = await loadJson(this.uploadDataPath);
        }

        this.data = data;

        // Something pretty wrong here
        if (!outputExists && !uploadExists) {
            throw new ServerError(CONF.errors.video_not_found);
        }

        return data;
    }

    async outputExists() {
        const file = await fileExists(this.outputFilePath);
        const data = await fileExists(this.outputDataPath);
        return data && file;
    }

    async uploadExists() {
        const file = await fileExists(this.uploadFilePath);
        const data = await fileExists(this.uploadDataPath);
        return data && file;
    }
}

module.exports = { Video };