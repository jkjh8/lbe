const mongoose = require('mongoose')

const zonesSchema = new mongoose.Schema({
  id: { type: Number, unique: true, requird: true },
  name: { type: String, requird: true },
  zones: { type: Array },
  relays: { type: Array },
  fn: { type: Array },
  createAt: { type: Date },
  updateAt: { type: Date }
})

const Zones = mongoose.model('Zones', zonesSchema)
module.exports = Zones
