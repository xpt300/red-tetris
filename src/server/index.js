import fs  from 'fs'
import debug from 'debug'
import shapes from '../client/functions/newShapes'


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

const initEngine = io => {
  io.on('connection', function(socket){
    loginfo("Socket connected: " + socket.id)
    const query = socket.handshake['query']
    const arrayQuery = query.room.split('[')
    const room = arrayQuery[0]
    const name = arrayQuery[1].substr(0, arrayQuery[1].length - 1)
    console.log('user join ' + room, 'avec le nom : ' + name)
    socket.join(room)
    socket.on('action', (action) => {
      if(action.type === 'start'){
        socket.emit('shapes', {
          shapes: shapes(Math.floor(Math.random() * 7)),
          newShapes: shapes(Math.floor(Math.random() * 7))})
      }
    })
    socket.on('event', (event) => {
      console.log(event);
    })
  })
}

export function create(params){
  const promise = new Promise( (resolve, reject) => {
    const app = require('http').createServer()
    initApp(app, params, () =>{
      const io = require('socket.io')(app)
      // const stop = (cb) => {
      //   io.close()
      //   app.close( () => {
      //     app.unref()
      //   })
      //   loginfo(`Engine stopped.`)
      //   cb()
      // }

      initEngine(io)
      // resolve({stop})
    })
  })
  return promise
}
