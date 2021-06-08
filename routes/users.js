const express = require('express')
const router = express.Router()

const users = require('../api/users')
const { isLoggedIn } = require('../api/users')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/local', users.login)
router.post('/oauth', users.loginOauth)
router.post('/local/register', users.register)
router.get('/logout', users.logout)

router.get('/get', isLoggedIn, users.getUser)
router.get('/refresh', users.refresh)
router.post('/del', isLoggedIn, users.delUser)

router.get('/users', isLoggedIn, users.users)

module.exports = router
