const disconnectRoom = (socket, games) => {
    const test = games.filter(games => games.room == socket.addRoom)
    if (test[0] && test[0].master['socketId'] == socket.id) {
      if (test[0].player.length == 1) {
        games = games.filter(games => games.room != socket.addRoom)
      } else {
        games = games.map(game => {
          if (game.master['socketId'] == socket.id) {
            game.master = game.player[1]
            game.player = game.player.slice(1, game.player.length)
            socket.broadcast.to(game.master['socketId']).emit('newText', {text: "You're Master, Press <Enter> for START"})
            socket.emit('text', {text: "Waiting to game start...", name: socket.name})
            socket.leave(game.room)
            if (game.player.length == 1) {
              socket.broadcast.in(game.room).emit('end',  {score: game.player[0].score, numberPlayer: 1, text: 'You are the MASTER choose a level and press enter to start again...'})
              game.end = true
            }
          }
          return game
        })
      }
    } else if (games) {
      games = games.filter(games => {
        const player = games.player.filter(joueur => joueur.socketId == socket.id)
        if (games.room == socket.addRoom && player[0]) {
            games.player = games.player.filter(player => player.socketId != socket.id)
            socket.leave(games.room)
            if (games.player.length == 1) {
              socket.broadcast.in(games.room).emit('end',  {win: true, score: games.player[0].score, numberPlayer: 1, text: 'You are the MASTER choose a level and press enter to start again...'})
              games.end = true
            }
        }
        return games
      })
    }
    return games
}

module.exports = disconnectRoom