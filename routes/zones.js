const express = require('express')
const router = express.Router()

const zones = require('../api/zones')
const { isLoggedIn } = require('../api/users')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/addLocals', isLoggedIn, zones.addLocals)
router.post('/updateLocalName', isLoggedIn, zones.updateLocalName)
router.get('/deleteLocal', isLoggedIn, zones.deleteLocal)

router.get('/get', isLoggedIn, zones.get)
router.post('/addZones', isLoggedIn, zones.addZones)
router.post('/updateZoneName', isLoggedIn, zones.updateZone)
router.post('/deleteZone', isLoggedIn, zones.deleteZone)
router.get('/resetZones', zones.resetZones)

router.post('/addRelays', isLoggedIn, zones.addRelays)
router.post('/updateRelay', isLoggedIn, zones.updatRelay)
router.post('/deleteRelay', isLoggedIn, zones.deleteRelay)

module.exports = router