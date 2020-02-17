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
      newPlayer(socket)
    })
    socket.on('disconnect', (data) => {
      disconnectRoom(socket)
    })
    socket.on('action', (action) => {
      if (action.type === 'start') {
        socket.emit('start', {
          shapes: shapes(),
            newShapes: shapes()
        })
      } else if (action.type === 'shapes') {
        socket.emit('shapes', {
          newShapes: shapes(),
        })
      }
    })
    socket.on('event', (event) => {
      console.log(event);
    })
  })
}

const newPlayer = (socket) => {
  const game = games.filter(games => games.room == socket.addRoom)
  if (!game[0]) {
    const player = new Player(socket.name, socket.id)
    socket.player = player
    const piece = new Piece
    const game = new Game(false, 0, socket.addRoom, player, piece.shapes())
    games.push(game)
    socket.emit('text', {text: "You're Master, Press <Enter> for START", name: socket.name})
  } else {
    const player = new Player(socket.name, socket.id)
    socket.player = player
    games = games.map(games => {
      if (games.room == socket.addRoom) {
        games.player.push(player)
      }
      return games
    })
    socket.emit('text', {text: "Waiting to game start...", name: socket.name})
  }
  console.log(games);
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
        }
        return games
      })
    }
  } else if (games) {
    games = games.filter(games => {
      if (games.room == socket.addRoom) {
          games.player = games.player.filter(player => player.socketId != socket.id)
      }
      return games
    })
  }
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
