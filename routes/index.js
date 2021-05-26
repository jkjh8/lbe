var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
});

const users = require('./users')

router.use('/auth', users)

module.exports = router
