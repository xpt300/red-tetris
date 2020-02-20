import { Piece } from '../models'

export const startGame = (socket, io, games) => {
    games = games.map(game => {
      if (game.room == socket.addRoom) {
        if (game.master['name'] == socket.name && game.start == false) {
          game.start = true
          const piece = new Piece
          game.pieces.push(piece.tenShapes())
          game.master['tour'] = game.master['tour'] + 1
          game.tour = game.tour + 1 
          if (socket.addRoom != undefined) {
            io.sockets.in(game.room).emit('start', {
                shapes: game.pieces[game.master['tour'] - 1],
                newShapes: game.pieces[game.master['tour']]
            })
          } else {
            socket.emit('start', {
              shapes: game.pieces[game.master['tour'] - 1],
              newShapes: game.pieces[game.master['tour']]
          })
          }
        }
      }
      return game
    })
    console.log(games, 'startGame');
    return games
}