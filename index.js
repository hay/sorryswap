const CONF = require('./conf.js')();
console.log('Loaded config', JSON.stringify(CONF, null, 4));

const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const multer = require('multer');

// Setup express
const app = express();

// Static stuff
const static = express.static(CONF.server.static_path);
app.use(static);

// File uploads
const upload = multer({
    dest : CONF.server.upload_path
});
app.post('/upload', upload.single('video'), (req, res) => {
    console.log(res);
});

// Socet.io
const server = http.Server(app);
const io = socketio.listen(server);
const PORT = CONF.server.port;

// Main loop
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