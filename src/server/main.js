var http = require('http');
var express = require('express');
var app = express();

import { disconnectRoom, newPlayer, startGame, newShapes } from './controllers/index'
import { Piece } from './models'

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
    socket.on('newPlayer', (action) => {
        if (socket.addRoom) {
            games = newPlayer(socket, games)
        } else {
            socket.emit('text', {text: "You're Master, Press <Enter> for START", name: socket.name})
        }
    })
    socket.on('disconnect', (data) => {
      games = disconnectRoom(socket, games)
    })
    const piece = new Piece
    socket.on('action', (action) => {
      if (action.type === 'start') {
          if (socket.addRoom) {
            games = startGame(socket, io, games)
          }
          else {
            socket.emit('start', {
                newShapes: piece.shapes()
            })
          } 
      } else if (action.type === 'shapes') {
          if (socket.addRoom) {
            games = newShapes(socket, io, games)
          } else {
            socket.emit('shapes', {
                newShapes: piece.shapes()
            })
          }
      }
    })
    socket.on('event', (event) => {
      console.log(event);
    })
});

