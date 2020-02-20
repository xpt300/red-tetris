import { Game, Player, Piece } from '../models'

export const newPlayer = (socket, games) => {
    const game = games.filter(games => games.room == socket.addRoom)
    if (!game[0]) {
      const player = new Player(socket.name, socket.id)
      socket.player = player
      const piece = new Piece
      const game = new Game(false, 0, socket.addRoom, player, piece.shapes())
      game.player.push(player)
      games.push(game)
      socket.emit('text', {text: "You're Master, Press <Enter> for START", name: socket.name})
      socket.join(game.room)
    } else {
      const player = new Player(socket.name, socket.id)
      socket.player = player
      games = games.map(game => {
        if (game.room == socket.addRoom) {
          if (game.start) {
            socket.emit('text', {text: "The room is start please change...", name: socket.name})  
          } else {
            game.player.push(player)
            socket.emit('text', {text: "Waiting to game start...", name: socket.name})
            socket.join(game.room)
          }
        }
        return game
      })
    }
    console.log(games, 'Newplayer');
    return games
}