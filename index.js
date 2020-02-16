const CONF = require('./conf.js')();
console.log('Loaded config', JSON.stringify(CONF, null, 4));

const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const static = express.static(CONF.server.static_path);
app.use(static);

const server = http.Server(app);
const io = socketio.listen(server);
const PORT = CONF.server.port;

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);

    io.on('connection', (socket) => {
        console.log('connected!');

        socket.on('clientlog', (msg) => {
            console.log('clientlog', msg);
            io.emit('log', msg);
        });
    });
});