export const disconnectRoom = (socket, games) => {
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
          }
          return game
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
    return games
}