import io from 'socket.io-client'

const socketMiddleWare = (store) => {
    return next => (action) => {
        const socket = io('http://0.0.0.0:3004', {
            query: 'room=' + window.location.href.split('/')[3]
        })
        if (action.type === 'START') {
            socket.emit('action', {type : 'start'})
            socket.on('start', (shapes) => {
                action.object = shapes
                return next(action)
            })
        } else if (action.type === 'SHAPES') {
            socket.emit('action', {type : 'shapes', board: action.board})
            socket.on('shapes', (object) => {
                action.object = object
                return next(action)
            })
        } else if (action.type === 'END') {
            socket.emit('end')
            return next(action)
        }
        return 
    }
}

export default socketMiddleWare