const TOML = require('@iarna/toml');
const fs = require('fs');

module.exports = function() {
    const data = fs.readFileSync('./conf.toml', 'utf-8');
    return TOML.parse(data);
}