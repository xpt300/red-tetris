import { Piece } from '../models'

export const startGame = (socket, io, games) => {
    games = games.map(game => {
      if (game.room == socket.addRoom) {
        if (game.master['name'] == socket.name && game.start == false) {
          game.start = true
          io.sockets.in(game.room).emit('start', {
              shapes: game.pieces,
              start: true
          })
        }
      }
      return game
    })
    console.log(games, 'startGame');
    return games
}