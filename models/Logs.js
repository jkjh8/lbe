const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const logsSchema = new mongoose.Schema({
  source: { type: String, requird: true },
  category: { type: String, required: true, default: 'info' }, //warning, error
  priority: { type: String, required: true, default: 'low' }, //mid, high
  date: { type: Date, required: true, default: Date.now },
  zones: { type: Array },
  message: { type: String, required: true }
})
logsSchema.index({ '$**': 'text' })
logsSchema.plugin(mongoosePaginate)

const Logs = mongoose.model('Logs', logsSchema)
module.exports = Logs
