const mongoose = require('mongoose')
const dbLogs = require('../models/Logs')

console.log('load db start')

function startup () {
  return new dbLogs({
    source: '로그서버',
    category: 'Info',
    zones: '방송센터',
    message: 'Log Server DB Started!'
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
  console.log('MongoDB connected...')
  const msg = startup()
  msg.save()
})

module.exports = db
