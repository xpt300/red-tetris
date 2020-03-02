import { Tetriminos } from '../models'

export const newShapes = (socket, io, games, board, length) => {
    let allBoard = []
    const forSend = []
    games = games.map(game => {
        if (game.room == socket.addRoom) {
            game.player = game.player.map(player => {
                if (player.socketId === socket.id) player.board = board
                if (player.board[0]) allBoard.push({board: player.board, name: player.name})
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
            io.sockets.in(game.room).emit('shapes', {
                shapes: forSend ? forSend : null,
                board: allBoard
            })
            // socket.broadcast.to(game.room).emit('end',  {score: scoreGame, text: 'You are the MASTER chosen level and press enter to start again...'})
        }
        return game
    })
    return games
}