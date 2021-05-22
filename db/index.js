const mongoose = require('mongoose')
const dbLogs = require('../models/Logs')

function startup () {
  return new dbLogs({
    source: 'LogServer',
    category: 'Info',
    zones: '방송센터',
    message: 'Log Server Started!'
  })
}

mongoose.connect('mongodb://localhost/logserver', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  connectTimeoutMS: 1000
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'db Connection Error:'))

db.once('open', () => {
  const msg = startup()
  msg.save()
  console.log('MongoDB connected...')
})

module.exports = db