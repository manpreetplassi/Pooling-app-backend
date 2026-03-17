const userEvents = (io, socket) => {
    socket.on('register', (data) => {
        console.log("register", data, socket.id)
    })
}

export default userEvents;