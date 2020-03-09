const fs = require('fs');
const fsPromise = require('fs').promises;
const pathlib = require('path');
const { range, sample } = require('lodash');

const CONF = require('../conf.js')();

module.exports = {
    fileExists(path) {
        return new Promise((resolve) => {
            fs.access(path, fs.F_OK, (err) => {
                resolve(!err);
            })
        });
    },

    getIsoDate() {
        return new Date().toISOString().slice(0, 16)
    },

    getShortCode() {
        const chars = CONF.server.short_code_chars;
        const len = CONF.server.short_code_length;
        return range(len).map(() => sample(chars)).join('');
    },

    async loadJson(path) {
        const data = await fsPromise.readFile(path, 'utf-8');
        return JSON.parse(data);
    },

    parsePath(path) {
        const extension = pathlib.extname(path);

        return {
            originalPath : path,
            basename : pathlib.basename(path),
            extension : extension,
            stem : pathlib.basename(path, extension)
        };
    },

    async writeJson(path, data) {
        const json = JSON.stringify(data, null, 4);
        await fsPromise.writeFile(path, json, 'utf-8');
    }
};