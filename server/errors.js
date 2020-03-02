class ServerError {
    constructor(e) {
        this.status = e[0];
        this.message = {
            errorcode : e[0],
            error : e[1]
        };
    }
}

module.exports = { ServerError };