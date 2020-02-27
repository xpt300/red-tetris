const socketMiddleWare = () => {
    return next => (action) => {
        if (action.type === 'ROOM') {
            action.socket.emit('newPlayer', {type : 'room'})
            action.socket.on('text', (obj) => {
                action.object = obj
                return next(action)
            })
        } else if (action.type === 'START') {
            action.socket.emit('action', {type : 'start'})
            action.socket.on('start', (newShapes) => {
                action.object = newShapes
                return next(action)
            })
        } else if (action.type === 'SHAPES') {
            action.socket.emit('action', {type : 'shapes', board: action.board})
        } else if (action.type === 'END') {
            action.socket.emit('end')
            return
        } else if (action.type === 'SCORE') {
            action.socket.emit('action', {type : 'score', score : action.score})
            action.socket.on('score', (object) => {
                action.object = object
                return next(action)
            })
        } else if (action.type === 'LEVEL') {
            action.socket.emit('action', {type : 'level', ope : action.ope})
        } else if (action.type === 'MAJBOARD') {
            action.socket.emit('action', {type: 'board', board : action.stage})
            return next(action)
        } else {
            return next(action)
        }
    }
}

export default socketMiddleWare