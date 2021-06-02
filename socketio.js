const cookie = require('cookie')

io.on('connection', function (socket) {
  const cookies = cookie.parse(socket.request.headers.cookie)
  console.log('a user connected', cookies)
})