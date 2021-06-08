const evnetlog = require('../../models/Logs')

module.exports.get = function (req, res) {
  let search = ''
  let zones = ''
  const enable = req.query.date
  const start = req.query.start
  const end = req.query.end

  if (req.query.search !== 'undefined') { search = req.query.search }
  if (req.query.zones) { zones = req.query.zones.split(',') }

  const searchOptions = []
  let findQuery = {}

  if (search) { searchOptions.push({ $text: { $search: search } }) }
  if (zones) { searchOptions.push({ zones: { $in: zones } }) }
  if (enable === 'true') {
    searchOptions.push({ 'date': { '$gte': start, '$lt': end } })
  }

  if (searchOptions.length > 0) {
    findQuery = { $and: searchOptions }
  }

  const options = {
    page: req.query.page,
    limit: req.query.limit,
    sort: { date: -1 }
  }
  console.log(findQuery)
  evnetlog.paginate(findQuery, options, (err, r) => {
    if (err) return res.status(500).json({ status: 'error', value: err })
    return res.status(200).json(r)
  })
}
