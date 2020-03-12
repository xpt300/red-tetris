const board = (socket, board, games, io) => {
    let allBoard = []
    games = games.map(game => {
        if (game.room == socket.addRoom) {
            game.player.map(player => {
                if (player.socketId === socket.id) {
                    player.board = board
                }
                if (player.board[0]) allBoard.push({board: player.board, name: player.name})
            })
            io.sockets.in(game.room).emit('board', allBoard)
        }
        return game
    })
    return games
}

module.exports = board