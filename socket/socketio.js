// const cookie = require('cookie')

const connected = new Array()

io.on('connection', function (client) {
  // const cookies = cookie.parse(socket.request.headers.cookie)
  console.log('a user connected', client.id)
  // connected.push(client.id)
  console.log(io.engine.clientsCount)

  io.to(client.id).emit('chk', 'ok')
  client.on('disconnect', () => {
    console.log('disconnect', client.id)
    console.log(io.engine.clientsCount)
  })
})
