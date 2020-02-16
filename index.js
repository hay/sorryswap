const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const static = express.static('dist');
app.use(static);
const server = http.Server(app);
const io = socketio.listen(server);
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);

    io.on('connection', (socket) => {
        console.log('connected!');

        socket.on('clientlog', (msg) => {
            console.log('clientlog', msg);
            io.emit('log', msg);
        });
    });

    // setInterval(() => {
    //     let datetime = new Date().toISOString().slice(0, 19);
    //     io.emit('time', datetime);
    // }, 1000);
});