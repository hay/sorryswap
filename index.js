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
    let index = 1;

    setInterval(() => {
        io.emit('index', index);
        index += 1;
    }, 1000);
});