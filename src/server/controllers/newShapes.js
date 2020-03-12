import { Tetriminos } from '../models'

export const newShapes = (socket, io, games, board, length, fullLine) => {
    let allBoard = []
    const forSend = []
    games = games.map(game => {
        if (game.room == socket.addRoom) {
            game.player = game.player.map(player => {
                if (player.socketId === socket.id) player.board = board
                if (player.board[0]) allBoard.push({board: player.board, name: player.name, end: player.end})
                if (socket.id == player['socketId'] && length <= 6) {
                    const tetriminos = new Tetriminos
                    for (let i = 0; i < 5; i++) {
                        let tetro = tetriminos.randomTetromino()
                        game.pieces.push(tetro)
                        forSend.push(tetro)
                    }
                }
                return player
            })
            socket.broadcast.in(game.room).emit('shapes', {
                shapes: forSend ? forSend : null,
                board: allBoard,
                fullLine: fullLine
            })
            socket.emit('shapes', {
                shapes: forSend ? forSend : null,
                board: allBoard
            })
        }
        return game
    })
    return games
}