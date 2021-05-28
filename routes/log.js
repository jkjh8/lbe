const express = require('express')
const router = express.Router()

const log = require('../api/eventlog')

const { isLoggedIn } = require('../api/users')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/get', isLoggedIn, log.get)


module.exports = router
