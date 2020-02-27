export const board = (socket, board, games, io) => {
    games = games.map(game => {
        if (game.room == socket.addRoom) {
            game.player.map(player => {
                if (player.socketId === socket.id) {
                    player.board = board
                    io.sockets.in(game.room).emit('board', {board: board, name: player.name})
                }
            })
        }
        return game
    })
    return games
}