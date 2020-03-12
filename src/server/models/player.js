export class Player {
    constructor(name, socketId) {
        this.name = name
        this.socketId = socketId
        this.score = 0
        this.end = false
        this.board = []
    }
}