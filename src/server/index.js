import fs  from 'fs'
import debug from 'debug'
import socketMiddleWare from '../client/middleware/socketMiddleWare'
import {Game} from './models/game'
import {Player} from './models/player'
import {Piece} from './models/piece'
import { disconnect } from 'cluster'
import { game } from '../client/actions/game'

let games = []

const logerror = debug('tetris:error')
  , loginfo = debug('tetris:info')

const initApp = (app, params, cb) => {
  const {host, port} = params
  const handler = (req, res) => {
    const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
    fs.readFile(__dirname + file, (err, data) => {
      if (err) {
        logerror(err)
        res.writeHead(500)
        return res.end('Error loading index.html')
      }
      res.writeHead(200)
      res.end(data)
    })
  }

  app.on('request', handler)

  app.listen({host, port}, () =>{
    loginfo(`tetris listen on ${params.url}`)
    cb()
  })
}



const initEngine = (io) => {
  io.on('connection', function(socket){
    const query = socket.handshake['query']
    if (query.room !== '') {
      const arrayQuery = query.room.split('[')
      socket.addRoom = arrayQuery[0]
      socket.name = arrayQuery[1].substr(0, arrayQuery[1].length - 1)
      console.log('user join ' + socket.id, 'avec le nom : ' + socket.name + ' dans la room ' + socket.addRoom)
    }
    loginfo("Socket connected: " + socket.id)
    socket.on('newPlayer', (action) => {
      newPlayer(socket, io)
    })
    socket.on('disconnect', (data) => {
      disconnectRoom(socket)
    })
    socket.on('action', (action) => {
      if (action.type === 'start') {
        startGame(socket, io)
      } else if (action.type === 'shapes') {
        newShapes(socket, io)
      }
    })
    socket.on('event', (event) => {
      console.log(event);
    })
  })
}

const newShapes = (socket, io) => {
  // games = games.map(game => {
  //   if (game.room == socket.addRoom) {
  //     if (game.master['name'] == socket.name && game.start == false) {
  //       game.start = true
  //       const piece = new Piece
  //       game.pieces.push(piece.shapes())
  //       game.master['tour'] = game.master['tour'] + 1 
  //       io.sockets.in(game.room).emit('start', {
  //           shapes: game.pieces[game.master['tour'] - 1],
  //           newShapes: game.pieces[game.master['tour']]
  //       })
  //     }
  //   }
  //   return game
  // })
  // console.log(games, 'startGame');
}

const startGame = (socket, io) => {
  games = games.map(game => {
    if (game.room == socket.addRoom) {
      if (game.master['name'] == socket.name && game.start == false) {
        game.start = true
        const piece = new Piece
        game.pieces.push(piece.shapes())
        game.master['tour'] = game.master['tour'] + 1 
        io.sockets.in(game.room).emit('start', {
            shapes: game.pieces[game.master['tour'] - 1],
            newShapes: game.pieces[game.master['tour']]
        })
      }
    }
    return game
  })
  console.log(games, 'startGame');
}

const newPlayer = (socket, io) => {
  const game = games.filter(games => games.room == socket.addRoom)
  if (!game[0]) {
    const player = new Player(socket.name, socket.id)
    socket.player = player
    const piece = new Piece
    const game = new Game(false, 0, socket.addRoom, player, piece.shapes())
    games.push(game)
    socket.emit('text', {text: "You're Master, Press <Enter> for START", name: socket.name})
    socket.join(game.room)
  } else {
    const player = new Player(socket.name, socket.id)
    socket.player = player
    games = games.map(game => {
      if (game.room == socket.addRoom) {
        if (game.start) {
          socket.emit('text', {text: "The room is start please change...", name: socket.name})  
        } else {
          game.player.push(player)
          socket.emit('text', {text: "Waiting to game start...", name: socket.name})
          socket.join(game.room)
        }
      }
      return game
    })
  }
  console.log(games, 'Newplayer');
}

const disconnectRoom = (socket) => {
  const test = games.filter(games => games.room == socket.addRoom)
  if (test[0] && test[0].master['socketId'] == socket.id) {
    if (test[0].player.length == 0) {
      games = games.filter(games => games.room != socket.addRoom)
    } else {
      games = games.map(games => {
        if (games.master['socketId'] == socket.id) {
          games.master = games.player[0]
          games.player = games.player.slice(1, games.player.length)
          socket.broadcast.to(games.master['socketId']).emit('newText', {text: "You're Master, Press <Enter> for START"})
          socket.emit('text', {text: "Waiting to game start...", name: socket.name})
          socket.leave(games.room)
        }
        return games
      })
    }
  } else if (games) {
    games = games.filter(games => {
      if (games.room == socket.addRoom) {
          games.player = games.player.filter(player => player.socketId != socket.id)
          socket.leave(games.room)
      }
      return games
    })
  }
  console.log(games), 'disconnect';
}

export function create(params){
  const promise = new Promise( (resolve, reject) => {
    const app = require('http').createServer()
    initApp(app, params, () =>{
      const io = require('socket.io')(app)
      initEngine(io)
    })
  })
  return promise
}
