import { Tetriminos } from '../models'

export const newShapes = (socket, io, games) => {
    games = games.map(game => {
        if (game.room == socket.addRoom) {
            game.player = game.player.map(player => {
                if (socket.id == player['socketId']) {
                    console.log(player.name, player.tour, game.tour);
                    if (player.tour >= game.tour) {
                        const tetriminos = new Tetriminos
                        game.pieces.push(tetriminos.randomTetromino())
                        game.tour = game.tour + 1 
                        console.log(player.tour, game.tour, game.pieces.length, 'if');
                        socket.emit('shapes', {
                            newShapes: game.pieces[player.tour]
                        })
                        player.tour = player.tour + 1
                    } else {
                        socket.emit('shapes', {
                            newShapes: game.pieces[player.tour]
                        })
                        player.tour = player.tour + 1
                        console.log(player.tour, game.tour, game.pieces.length, 'else');
                    }
                }
                return player
            })
        }
        return game
    })
    console.log(games, 'startGame');
    return games
}