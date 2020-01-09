const playerJoin = (socket, query) => {
    const arrayQuery = query.room.split('[')
    socket.room = arrayQuery[0]
    socket.name = arrayQuery[1].substr(0, arrayQuery[1].length - 1)
    console.log('user join ' + socket.room, 'avec le nom : ' + socket.name)
    socket.join(socket.room)
    return socket
}

export default playerJoin