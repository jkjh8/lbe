const mongoose = require('mongoose')

const zonesSchema = new mongoose.Schema({
  id: { type: Number, unique: true, requird: true },
  mon: { type: Boolean, requird: true, default: false },
  vol: { type: Number, requird: true, default: 70 },
  mute: { type: Boolean, requird: true, default: false },
  name: { type: String, requird: true },
  code: { type: String },
  zones: [new mongoose.Schema ({
    id: { type: Number, requird: true, },
    name: { type: String, requird: true,},
    code: { type: String },
    type: { type: String, default: 'zone' },
    vol: { type: Number, requird: true, default: 70 },
    mute: { type: Boolean, requird: true, default: false },
    recVol: { type: Number, requird: true, default: 70 },
    recMute: { type: Boolean, requird: true, default: false },
    liveVol: { type: Number, requird: true, default: 70 },
    liveMute: { type: Boolean, requird: true, default: false },
    mon: { type: Boolean, requird: true, default: false }
  })],
  relays: [new mongoose.Schema ({
    id: { type: Number, requird: true, },
    name: { type: String, requird: true, },
    code: { type: String },
    value: { type: Boolean, requird: true, },
  })],
  fn: { type: Array },
  es: { type: Boolean, requird: true },
  createAt: { type: Date },
  updateAt: { type: Date }
})

const Zones = mongoose.model('Zones', zonesSchema)
module.exports = Zones
