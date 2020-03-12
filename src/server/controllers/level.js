const level = (socket, ope, games, io) => {
    games = games.map(game => {
        if (game.room == socket.addRoom) {
            if (socket.id === game.master['socketId']) {
                if (ope === '+') {
                    game.level += 1
                } else if (ope === '-') {
                    game.level -= 1
                }
                io.sockets.in(game.room).emit('level', game.level)
            }
        }
        return game
    })
    return games
}

module.exports = level