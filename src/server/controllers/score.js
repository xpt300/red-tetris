export const score = (socket, score, games) => {
    games = games.map(game => {
        if (game.room == socket.addRoom) {
            game.player = game.player.map(player => {
                if (socket.id == player['socketId']) {
                    player.score = score
                    socket.emit('score', {score : player.score})
                }
                return player
            })
        }
        return game
    })
    return games
}