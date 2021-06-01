const Zones = require('../../models/Zones')

module.exports.get = async function (req, res) {
  try {
    const zones = await Zones.find({})
    return res.status(200).json({ locals: zones })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ status: 'error', info: err })
  }
}
