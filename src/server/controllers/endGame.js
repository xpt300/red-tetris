export const endGame = (socket, io, games) => {
    games = games.map(game => {
        if (game.room == socket.addRoom) {
            const scoreGame = []
            game.player.map(player => {
                scoreGame.push({name : player.name, score: player.score})
            })
            io.sockets.in(game.room).emit('end', scoreGame)
        }
        return game
    })
    return games
}