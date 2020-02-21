export class Game {
    constructor(start, level, room, player) {
        this.level = level
        this.room = room
        this.over = false
        this.start = start
        this.master = player
        this.player = []
        this.pieces = []
    }

    changeLevel (level) {
        this.level = level
    }

    createRoomWithName (player) {
        this.player.push(player)
    }

    leaveRoom (player) {
        this.room.filter(player => player != player)
    }
}