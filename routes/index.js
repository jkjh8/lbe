var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
});

const users = require('./users')
const log = require('./log')
const zones = require('./zones')

router.use('/auth', users)
router.use('/log', log)
router.use('/zones', zones)

module.exports = router
