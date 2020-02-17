const CONF = require('./conf.js')();
console.log('Loaded config', JSON.stringify(CONF, null, 4));

const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const Server = require('./server/Server.js');

// Setup express
const app = express();

// Socket.io
const httpserver = http.Server(app);
const io = socketio.listen(httpserver);

const server = new Server({
    app : app,
    io : io,
    server : httpserver
});

server.run();