const mongoose = require('mongoose')

const zonesSchema = new mongoose.Schema({
  id: { type: Number, unique: true, requird: true },
  mon: { type: Boolean, requird: true, default: false },
  vol: { type: Number, requird: true, default: 70 },
  mute: { type: Boolean, requird: true, default: false },
  name: { type: String, requird: true },
  code: { type: String },
  zones: { type: Array },
  relays: { type: Array },
  fn: { type: Array },
  es: { type: Boolean, requird: true },
  createAt: { type: Date },
  updateAt: { type: Date }
})

const Zones = mongoose.model('Zones', zonesSchema)
module.exports = Zones
