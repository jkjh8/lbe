const Zones = require('../models/Zones')
const Logs = require('../models/Logs')

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
