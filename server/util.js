module.exports = {
    getIsoDate() {
        return new Date().toISOString().slice(0, 16)
    }
};