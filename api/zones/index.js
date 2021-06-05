const { json } = require('express')
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

module.exports.addRelays = async function(req, res) {
  try {
    const data = req.body
    const r = await Zones.findOne({ id: data.local })
    r.relays = r.relays.concat(data.relay)

    const rt = await Zones.updateOne({ id: data.local }, { $set: { relays: r.relays } }, { upsert: true })
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

    const rt = await Zones.updateOne({ id: data.local }, { $set: { relays: r.relays } }, { upsert: true })
    res.status(200).json(rt)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports.deleteRelay = async function(req, res) {
  try {
    const data = req.body
    const r = await Zones.findOne({ id: data.local })
    r.relays.splice(data.relay, 1)
    const dr = []
    r.relays.forEach((item, idx) => {
      item.id = idx
      dr.push(item)
    })
    const rt = await Zones.updateOne({ id: data.local }, { $set: { relays: r.relays } }, { upsert: true })
    res.status(200).json(rt)
  } catch (err) {
    res.status(500).json(rt)
  }
}
