const startGame = (socket, io, games) => {
    games = games.map(game => {
      if (game.room == socket.addRoom) {
        if (game.master['name'] == socket.name && game.start == false) {
          game.start = true
          io.sockets.in(game.room).emit('start', {
              shapes: game.pieces,
              start: true,
              player: game.player.length
          })
        }
      }
      return game
    })
    return games
}

module.exports = startGame