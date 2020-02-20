export const disconnectRoom = (socket, games) => {
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
    return games
}