const fs = require('fs');
const fsPromise = require('fs').promises;

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

    async loadJson(path) {
        const data = await fsPromise.readFile(path, 'utf-8');
        return JSON.parse(data);
    },

    async writeJson(path, data) {
        const json = JSON.stringify(data, null, 4);
        await fsPromise.writeFile(path, json, 'utf-8');
    }
};