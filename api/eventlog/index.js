const evnetlog = require('../../models/Logs')

module.exports.get = function (req, res) {
  let search = ''
  let zones = ''
  if (req.query.search !== 'undefined') { search = req.query.search }
  if (req.query.zones) { zones = req.query.zones.split(',') }

  let searchOptions
  if (search && zones) {
    searchOptions = { $and: [
      { $text: { $search: search } },
      { $zones: { $in: zones } }
    ]}
  } else if (search) {
    searchOptions = { $text: { $search: search } }
  } else if (zones) {
    searchOptions = { zones: { $in: zones } }
  }
  const options = {
    page: req.query.page,
    limit: req.query.limit,
    sort: { date: -1 }
  }
  evnetlog.paginate(searchOptions, options, (err, r) => {
    console.log(err, r)
    if (err) return res.status(500).json({ status: 'error', value: err })
    return res.status(200).json(r)
  })
}
