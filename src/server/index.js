import fs  from 'fs'
import debug from 'debug'
import shapes from './models/piece'
import playerJoint from './models/playerJoint'
import socketMiddleWare from '../client/middleware/socketMiddleWare'
import {game} from './models/game'


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



const initEngine = (io, games) => {
  io.on('connection', function(socket){
    loginfo("Socket connected: " + socket.id)
    socket.on('co', (action) => {
      const query = socket.handshake['query']
      if (query.room !== '') {
        if (socket.adapter.rooms[socket.room] && socket.adapter.rooms[socket.room].length > 0) {
          playerJoint(socket, query)
          socket.emit('text', {text: "Waiting to game start...", name: socket.name})
        } else {
          playerJoint(socket, query)
          socket.emit()
          socket.emit('text', {text: "You're Master, Press <Enter> for START", name: socket.name})
        }
      } else {
        socket.emit('text', {text: "You're Master, Press <Enter> for START", name: ''})
      }
    })
    // socket.on('action', (action) => {
    //   if (action.type === 'start') {
    //     socket.emit('start', {
    //       shapes: shapes(),
    //         newShapes: shapes()
    //     })
    //   } else if (action.type === 'shapes') {
    //     socket.emit('shapes', {
    //       newShapes: shapes(),
    //     })
    //   }
    // })
    // socket.on('event', (event) => {
    //   console.log(event);
    // })
  })
}

export function create(params){
  const promise = new Promise( (resolve, reject) => {
    const app = require('http').createServer()
    initApp(app, params, () =>{

      const games = []
      const io = require('socket.io')(app)
      // const stop = (cb) => {
      //   io.close()
      //   app.close( () => {
      //     app.unref()
      //   })
      //   loginfo(`Engine stopped.`)
      //   cb()
      // }

      initEngine(io, games)
      // resolve({stop})
    })
  })
  return promise
}
