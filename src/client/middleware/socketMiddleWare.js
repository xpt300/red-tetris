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
            action.socket.on('start', (shapes) => {
                action.object = shapes
                return next(action)
            })
        } else if (action.type === 'SHAPES') {
            action.socket.emit('action', {type : 'shapes', board: action.board})
            action.socket.on('shapes', (object) => {
                action.object = object
                return next(action)
            })
        } else if (action.type === 'END') {
            action.socket.emit('end')
            return next(action)
        } else {
            return next(action)
        }
    }
}

export default socketMiddleWare