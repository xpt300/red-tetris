import { Tetriminos } from '../models'

export const newShapes = (socket, io, games) => {
    games = games.map(game => {
        if (game.room == socket.addRoom) {
            game.player = game.player.map(player => {
                if (socket.id == player['socketId']) {
                    const tetriminos = new Tetriminos
                    const forSend = []
                    for (let i = 0; i < 5; i++) {
                        let tetro = tetriminos.randomTetromino()
                        game.pieces.push(tetro)
                        forSend.push(tetro)
                    }
                    io.sockets.in(game.room).emit('shapes', {
                        shapes: forSend
                    })
                }
                return player
            })
        }
        return game
    })
    console.log(games, 'newShapes');
    return games
}