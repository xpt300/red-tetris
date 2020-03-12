const socketMiddleWare = () => {
    return next => (action) => {
        console.log(action, 'socket middelware');
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
        } else if (action.type === 'END') {
            action.socket.emit('end')
            return
        } else if (action.type === 'SCORE') {
            action.socket.emit('action', {type : 'score', score : action.score})
            action.socket.on('score', (object) => {
                action.object = object
                return next(action)
            })
        } else if (action.type === 'RESTART') {
            action.socket.emit('action', {type : 'restart'})
        } else if (action.type === 'LEVEL') {
            action.socket.emit('action', {type : 'level', ope : action.ope})
        } else if (action.type === 'DELETESHAPE') {
            action.socket.emit('action', {type : 'shapes', board: action.board, length: action.length, fullLine: action.fullLine})
            return next(action)
        } else {
            return next(action)
        }
    }
}

export default socketMiddleWare