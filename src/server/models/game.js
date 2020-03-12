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
}