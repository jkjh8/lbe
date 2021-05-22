const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const logsSchema = new mongoose.Schema({
  source: { type: String, requird: true },
  category: { type: String, required: true },
  priority: { type: String, required: true, default: 'Low' },
  date: { type: Date, required: true, default: Date.now },
  zones: { type: Array },
  message: { type: String, required: true }
})
logsSchema.index({ '$**': 'text' })
logsSchema.plugin(mongoosePaginate)

const Logs = mongoose.model('Logs', logsSchema)
module.exports = Logs
