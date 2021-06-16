const moment = require('moment')
const evnetlog = require('../../models/Logs')
const xlsx = require('xlsx')

function logObjToSheet (docs) {
  const sheet = []
  docs.forEach(doc => {
    sheet.push({
      date: moment(doc.date).format(),
      priority: doc.priority,
      category: doc.category,
      source: doc.source,
      zones: doc.zones.join(','),
      message: doc.message
    })
  })
  return xlsx.utils.json_to_sheet(sheet)
}

module.exports.getCsv = async function (req, res) {
  let zones = ''
  console.log(req.query)
  const enable = req.query.date
  const start = req.query.start
  const end = req.query.end

  if (req.query.zones) { zones = req.query.zones.split(',') }

  const searchOptions = []
  let findQuery = {}

  if (zones) { searchOptions.push({ zones: { $in: zones } }) }
  if (enable === 'true') {
    searchOptions.push({ 'date': { '$gte': start, '$lt': end } })
  }

  if (searchOptions.length > 0) {
    findQuery = { $and: searchOptions }
  }

  const logs = await evnetlog.find(findQuery)

  const sheet = await logObjToSheet(logs)
  const stream = await xlsx.stream.to_csv(sheet)

  const filename = moment().format('YYYY-MM-DD_hh:mm:ss') + '.csv'

  res.setHeader('Content-disposition', `attachment; filename=${filename}`)
  res.set('Content-Type', 'text/csv')

  stream.pipe(res).on('finish', () => {
    console.log('download complete')
  })
}
