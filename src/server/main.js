var http = require('http');
var express = require('express');
var app = express();

import { disconnectRoom, newPlayer, startGame, newShapes, score, level, endGame, board, restart } from './controllers/index'

let games = []

var server = http.createServer(app);
// Pass a http.Server instance to the listen method
var io = require('socket.io').listen(server);

// The server should start listening
server.listen(3004, (err) => {
    if (err) throw console.log(err);
    console.log(`Server listen : ${3004}`);
});

// Register the index route of your app that returns the HTML file
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html');
});

// Expose the node_modules folder as static resources (to access socket.io.js in the browser)
app.use('/static', express.static('node_modules'));

// Handle connection
io.on('connection', function (socket) {
    const query = socket.handshake['query']
    if (query.room !== '') {
      const arrayQuery = query.room.split('[')
      socket.addRoom = arrayQuery[0]
      socket.name = arrayQuery[1].substr(0, arrayQuery[1].length - 1)
      console.log('user join ' + socket.id, 'avec le nom : ' + socket.name + ' dans la room ' + socket.addRoom)
    }
    socket.on('newPlayer', () => {
      games = newPlayer(socket, games)
    })
    socket.on('disconnect', () => {
      games = disconnectRoom(socket, games)
    })
    socket.on('end', () => {
      games = endGame(socket, io, games)
    })
    socket.on('action', (action) => {
      switch (action.type) {
        case 'start' :
          games = startGame(socket, io, games)
          break;
        case 'shapes' : 
          games = newShapes(socket, io, games, action.board, action.length)
          break;
        case 'score' : 
          games = score(socket, action.score, games)
          break;
        case 'level' : 
          games = level(socket, action.ope, games, io)
          break;
        case 'restart' : 
          games = restart(socket, io, games)
          break;
      }
    })
});

