const express = require('express')
const router = express.Router()

const zones = require('../api/zones')
const { isLoggedIn } = require('../api/users')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/get', isLoggedIn, zones.get)

module.exports = router