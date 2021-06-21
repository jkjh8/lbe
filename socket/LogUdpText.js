const Zones = require('../models/Zones')
const Logs = require('../models/Logs')

const dgram = require('dgram')
const server = dgram.createSocket('udp4')

const PORT = 9999
const HOST = '0.0.0.0'

let zones = ['방송센터']
global.zones = zones

async function getZoneNames() {
  const r = await Zones.find({})
  r.forEach(zone => {
    zones[zone.id] = zone.name
  })
}
//지점 이름 불러오기
getZoneNames()

server.on('listening', function () {
  const addr = server.address()
  const start = new Logs({
    source: '로그서버',
    category: 'Info',
    zones: ['방송센터'],
    message: `UDP Text Server Start at ${addr.address}:${addr.port}`
  })
  start.save()
  console.log(`UDP Text Server Start at ${addr.address}:${addr.port}`)
})

server.on('message', function (msg, remote) {
  try {
    const message = msg.toString().split(',')
    console.log(message, zones[message[0]])
    const r = new Logs({
      source: zones[message[0]],
      category: 'Info',
      zones: [zones[message[0]]],
      message: message[1]
    })
    r.save()
    console.log(msg, remote)
  } catch (err) {
    console.error(err)
  }
})

server.bind(PORT, HOST)
