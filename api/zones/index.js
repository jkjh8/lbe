const Zones = require('../../models/Zones')

module.exports.get = async function (req, res) {
  // io.emit('zones', 'hello!')
  try {
    const zones = await Zones.find({})
    io.emit('zones', zones)
    return res.status(200).json({ locals: zones })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ status: 'error', info: err })
  }
}

// ----------------------------- ZONE -----------------------------
module.exports.addZoness = async function(req, res) {
  try {
    const data = req.body
    const r = await Zones.findOne({ id: data.local })
    
    for(let i = 0; i < data.zone.length; i++) {
      r.zones.push(data.zone[i])
    }
    const rt = await r.save()
    res.status(200).json(rt)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports.updateZone = async function(req, res) {
  try {
    const data = req.body

    const r = await Zones.findOne({ id: data.local })
    r.zones[data.zone.id].name = data.zone.name
    r.zones[data.zone.id].code = data.zone.code
    r.zones[data.zone.id].type = data.zone.type

    const rt = await r.save()
    res.status(200).json(rt)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports.deleteZone = async function(req, res) {
  try {
    const data = req.body
    const r = await Zones.findOne({ id: data.local })
    r.relays.id(data.zones._id).remove()
    for(let i = 0; i < r.zones.length; i++) {
      r.zones[i].id = i
    }
    const rt = await r.save()
    // const rt = await Zones.updateOne({ id: data.local }, { $set: { zones: r.zones, updateAt: Date.now() } }, { upsert: true })
    res.status(200).json(rt)
  } catch (err) {
    res.status(500).json(rt)
  }
}


// ----------------------------- RELAY -----------------------------
module.exports.addRelays = async function(req, res) {
  try {
    const data = req.body
    const r = await Zones.findOne({ id: data.local })

    for(let i = 0; i < data.relay.length; i++) {
      r.relays.push(data.relay[i])
    }
    const rt = await r.save()
    res.status(200).json(rt)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports.updatRelay = async function(req, res) {
  try {
    const data = req.body
    const r = await Zones.findOne({ id: data.local })
    r.relays[data.relay.id] = data.relay
    rt = await r.save()
    res.status(200).json(rt)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports.deleteRelay = async function(req, res) {
  try {
    const data = req.body
    const r = await Zones.findOne({ id: data.local })
    r.relays.id(data.relay._id).remove()
    for(let i = 0; i < r.relays.length; i++) {
      r.relays[i].id = i
    }

    const rt = await r.save()
    // const rt = await Zones.updateOne({ id: data.local }, { $set: { relays: r.relays } }, { upsert: true })
    res.status(200).json(rt)
  } catch (err) {
    res.status(500).json(err)
  }
}
