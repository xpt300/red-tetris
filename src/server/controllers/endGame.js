const endGame = (socket, io, games) => {
    games = games.map(game => {
        if (game.room == socket.addRoom) {
            game.player = game.player.map(player => {
                if (player.name === socket.name) player.end = true
                return player
            })
            const filtre = game.player.filter(player => player.end === false)
            if (filtre.length > 1) socket.emit('end', {text: 'Wait for other players to finish their game...'})
            else {                                                                                                                                                      
                const scoreGame = []
                game.player = game.player.map(player => {
                    scoreGame.push({name : player.name, score: player.score})
                    return player 
                })
                scoreGame.sort((a, b) => {
                    if (a.score > b.score) return -1;
                    if (b.score > a.score) return 1;
                    return 0;
                });
                game.player = game.player.map(player => {
                    let win = false
                    if (filtre[0] && player.socketId === filtre[0].socketId) {
                        win = true
                    }
                    if (player.socketId == socket.id) {
                        game.end = true
                        if (player.socketId === game.master['socketId'])
                            socket.emit('end',  {score: scoreGame, text: 'You are the MASTER choose a level and press enter to start again...', win})
                        else
                            socket.emit('end',  {score: scoreGame, text: 'Wait until the MASTER starts playing again...', win})
                    } else {
                        if (player.socketId === game.master['socketId'])
                            socket.broadcast.to(player.socketId).emit('end',  {score: scoreGame, text: 'You are the MASTER choose a level and press enter to start again...', win})
                        else
                            socket.broadcast.to(player.socketId).emit('end',  {score: scoreGame, text: 'Wait until the MASTER starts playing again...', win})
                    }
                    return player
                })
                game.end = true
            }
        }
        return game
    })
    return games
}

module.exports = endGame