import { Game, Player, Tetriminos } from '../models'

export const restart = (socket, io, games) => {
  games = games.map(game => {
    if (game.room == socket.addRoom) {
        if (game.master['name'] == socket.name && game.end == true) {
          game.player = game.player.map(player => {
            const newP = new Player(player.name, player.socketId)
            return newP
          })
          const tetriminos = new Tetriminos
          game.pieces = []
          for (let i = 0; i < 10; i++) {
            game.pieces.push(tetriminos.randomTetromino())
          }
          game.end = false
          io.sockets.in(game.room).emit('restart', {level: game.level, numberPlayer: game.player.length, shapes: game.pieces})
        }
      }
      return game
    })
    console.log(games, 'restartGame');
    return games
}