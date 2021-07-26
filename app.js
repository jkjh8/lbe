const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const passport = require('passport')
const http = require('http')

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '3000');


require('./db')

const history = require('connect-history-api-fallback')

const passportConfig = require('./api/passport')
require('dotenv').config()


const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express();
app.use(history())

app.use(cors({
  origin: function (origin, callback) {
    callback(null, origin)
  }, credentials: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

passportConfig()
app.use(passport.initialize())

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.set('port', port)

const server = http.createServer(app);
global.io = require('socket.io')(server,  {
  cors: {
    origin: [
      'http://192.168.1.92',
      'http://192.168.1.92:3000',
      'http://localhost:3000',
      'http://localhost:8080',
      'https//192.168.1.92'
    ],
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
})

require('./socket/LogUdpText')
require('./socket/LogUdpJson')
require('./socket/socketio.js')
require('./socket/ZoneRt')

module.exports = { app, server, port }
