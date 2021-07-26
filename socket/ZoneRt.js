const net = require('net')
const dbZones = require('../models/Zones')
const dbLogs = require('../models/Logs')

const clients = []

const server = net.createServer((client) => {
  client.on('data', async (data) => {
    let r
    const req = data.toString().toLowerCase().split(',')
    if (req[0] === "zone") {
      r = await getZone(req[1])
    } else if (req[0] == 'relay') {
      r = await getRelay(req[1])
    }
    client.write(r + ',!')
  })
})

async function getZone (id) {
  const r = await dbZones.findOne({ id: id })
  if (r) {
    const zone = r.zones.map(e => e.code)
    return zone.join(',')
  } else {
    return ''
  }
}

async function getRelay (id) {
  const r = await dbZones.findOne({ id: id })
  if (r) {
    const relay = r.relays.map(e => e.code)
    return relay.join(',')
  } else {
    return ''
  }
}

server.addListener('connection', (client) => {
  clients.push(client)
  client.write('connected data server')
})

server.addListener('listening', () => {
  const r = new dbLogs({
    source: '로그서버',
    category: 'Info',
    zones: ['방송센터'],
    message: 'Data Server Start at 49999'
  })
  r.save()
  console.log('Data Server Start at 49999')
})

server.addListener('close', () => {
  const r = new dbLogs({
    source: '로그서버',
    category: 'Info',
    zones: ['방송센터'],
    message: 'Data Server close'
  })
  r.save()
  console.log('UDP Text Server close')
})

async function startServer() {
  server.listen(49999, () => {
    server.on('error', (err) => {
      const r = new dbLogs({
        source: '로그서버',
        category: 'error',
        zones: ['방송센터'],
        message: err.toString()
      })
      r.save()
    })
  })
}

startServer()
