import io from 'socket.io-client'

const socketMiddleWare = (store) => {
    return next => (action) => {
        const socket = io('http://0.0.0.0:3004', {
            query: 'room=' + window.location.href.split('/')[3]
        })
        if (action.type === 'START') {
            socket.emit('action', {type : 'start'}, (res) => {
                action.object = res
                return next(action)
            })
        } else if (action.type === 'SHAPES') {
            socket.emit('action', {type : 'start'})
            socket.on('start', (shapes) => {
                action.object = shapes
                return next(action)
            })
        }
        return next(action)
    }
}

export default socketMiddleWare