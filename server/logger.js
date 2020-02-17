const fs = require('fs');

module.exports = class Logger {
    constructor(filePath) {
        this.filePath = filePath;
        this.fileStream = fs.createWriteStream(this.filePath, { flags : 'a' });
        this.log('Starting log');
    }

    close() {
        this.log('Closing log');
        this.fileStream.end();
    }

    log(msg) {
        let date = new Date().toISOString();
        let str = `[${date}] ${msg}\n`;
        this.fileStream.write(str);
        process.stdout.write(str); // No newline
    }
}