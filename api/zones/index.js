const Zones = require('../../models/Zones')

module.exports.get = async function (req, res) {
  // io.emit('zones', 'hello!')
  try {
    const zones = await Zones.find({}).sort({ id: 1 })
    io.emit('zones', zones)
    return res.status(200).json({ locals: zones })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ status: 'error', info: err })
  }
}

// LOCALS
module.exports.addLocals = async function(req, res) {
  const data = req.body
  console.log(data)

  for(let i = 0; i < data.length; i++) {
    r = new Zones({
      id: data[i].id,
      name: data[i].name,
      code: data[i].code,
      zones: [],
      relays: [],
      es: data[i].es,
      esNum: data[i].esNum,
      createAt: Date.now(),
      updateAt: Date.now()
    })
    await r.save()
  }
  res.status(200).json({ status: 'success' })
}


module.exports.updateLocalName  = async function(req, res) {
  try {
    const data = req.body
    const r = await Zones.findOne({ _id: data._id })
    r.id = data.id
    r.name = data.name
    r.code = data.code
    r.es = data.es
    r.esNum = data.esNum
    r.dsp = data.dsp
    r.pagecontrol = data.pagecontrol
    r.updateAt = Date.now()

    const rt = await r.save()
    res.status(200).json(rt)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports.deleteLocal = async function(req, res) {
  try {
    const id = req.query.id
    const r = await Zones.findByIdAndRemove(id)
    const rid = await Zones.find({})
    for (let i = 0; i < rid.length; i++) {
      await Zones.updateOne({ _id: rid[i]._id }, { $set: { id: i + 1 } })
    }
    res.status(200).json({ success: true })
  } catch (err) {
    res.status(500).json(err)
  }
}

// ----------------------------- ZONE -----------------------------
module.exports.resetZones = async function(req, res) {
  try {
    const id = req.query.id
    const r = await Zones.findOne({ id: id })

    let refZone = []
    let refRelay = []

    for(let i = 0; i < r.zones.length; i++) { r.zones[i].id = i; refZone.push(r.zones[i]) }
    for(let i = 0; i < r.relays.length; i++) { r.relays[i].id = i; refRelay.push(r.relays[i]) }

    const rt = await Zones.updateOne({ id: id }, { $set: { zones: refZone, relays: refRelay, updateAt: Date.now() } }, { upsert: true })
    res.status(200).json(rt)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports.addZones = async function(req, res) {
  try {
    const data = req.body
    const r = await Zones.findOne({ id: data.local })
    
    for(let i = 0; i < data.zone.length; i++) {
      r.zones.push(data.zone[i])
    }

    r.updateAt = Date.now()

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

    r.updateAt = Date.now()

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
    r.zones.id(data.zone._id).remove()
    for(let i = 0; i < r.zones.length; i++) {
      r.zones[i].id = i
    }

    r.updateAt = Date.now()

    const rt = await r.save()
    // const rt = await Zones.updateOne({ id: data.local }, { $set: { zones: r.zones, updateAt: Date.now() } }, { upsert: true })
    res.status(200).json(rt)
  } catch (err) {
    res.status(500).json(rt)
  }
}


// ----------------------------- RELAY -----------------------------
module.exports.resetRelays = async function(req, res) {
  const id = req.query.id
  const r = await Zones.findOne({ id: id })

  let ar = []

  for(let i = 0; i < r.relays.length; i++) {
    r.relays[i].id = i
    ar.push(r.relays[i])
  }

  const rt = await Zones.updateOne({ id: id }, { $set: { relays: ar, updateAt: Date.now() } }, { upsert: true })

  // const rt = await r.save()
  console.log(rt)
  res.status(200).json(rt)
}

module.exports.addRelays = async function(req, res) {
  try {
    const data = req.body
    const r = await Zones.findOne({ id: data.local })

    for(let i = 0; i < data.relay.length; i++) {
      r.relays.push(data.relay[i])
    }

    r.updateAt = Date.now()

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

    r.updateAt = Date.now()

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

    r.updateAt = Date.now()

    const rt = await r.save()
    // const rt = await Zones.updateOne({ id: data.local }, { $set: { relays: r.relays } }, { upsert: true })
    res.status(200).json(rt)
  } catch (err) {
    res.status(500).json(err)
  }
}
