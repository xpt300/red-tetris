import { Game, Player, Tetriminos } from '../models'

export const newPlayer = (socket, games) => {
    const game = games.filter(games => games.room == socket.addRoom)
    if (!game[0]) {
      if (!socket.addRoom) socket.addRoom = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      if (!socket.name) socket.name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const tetriminos = new Tetriminos
      const player = new Player(socket.name, socket.id)
      socket.player = player
      const game = new Game(false, 0, socket.addRoom, player)
      for (let i = 0; i < 10; i++) {
        game.pieces.push(tetriminos.randomTetromino())
      }
      game.player.push(player)
      games.push(game)
      socket.emit('text', {text: "You're Master, Press <Enter> for START", name: socket.name})
      socket.join(game.room)
    } else {
      const player = new Player(socket.name, socket.id)
      socket.player = player
      games = games.map(game => {
      if (game.room == socket.addRoom) {
        if (socket.name == null) socket.emit('text', {text: "After name room /#00 please choise [your_name]...", name: socket.name})
        else {
          const name = game.player.filter(player => player.name === socket.name)
          if (name[0]) socket.emit('text', {text: "Please change your name because another user has the same...", name: socket.name})  
          else if (game.player.length >= 4) socket.emit('text', {text: "The room is full please change...", name: socket.name})  
          else if (game.start) socket.emit('text', {text: "The room is start please change...", name: socket.name})  
          else {
            game.player.push(player)
            socket.emit('text', {text: "Waiting to game start...", name: socket.name})
            socket.join(game.room)
          }
        }
      }
      return game
    })
  }
  return games
}