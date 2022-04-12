// const express = require('express');
// const app = express();
// const server = require('http').createServer(app)
// const io = require('socket.io')(server);
//
// app.use(express.static(__dirname + '/public'));
// app.get('/', (req,res,next) => {
//     res.sendFile(__dirname + "/index.html")
// });
//
// io.on('connection', function(client) {
//     // console.log('Client connected...');
//     console.log('a user connected ...');
//     // client.emit('messages', "Hello from server")
// });
//
// server.listen(3000);
//

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

// server.listen(3000, '0.0.0.0');

