const passport = require('passport')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '../../.env') })

module.exports.register = function (req, res) {
  const chkEmail = await User.findOne({ email: req.body.email })
  if (chkEmail) return res.status(403).json({ message: 'This email is already use' })

  const user = new User({
    id: req.body.email,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    provider: 'local',
    admin: false,
    level: 0
  })

  user.save((err, user) => {
    if (err) return res.status(500).json({ message: 'Error on register' })
    return res.status(200).json({ message: 'user save complate', _id: user._id })
  })
}

module.exports.login = function (req, res) {
  passport.authenticate('local', { session: false }, (err, user) =>{
    if (err || !user) return res.status(400).json({ message: 'Error! user not found' })

    req.login(user, { session: false }, (error) => {
      if (error) return res.status(401).json({ message: 'user error', error: error})

      User.updateOne({ id: user.id }, { $set: { date: Date.now }})
      
      const token = {
        accessToken: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '5m'}),
        refreshToken: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d'}),
        user: user
      }

      return res.status(200).json(token)
    })
  })(req, res)
}

module.exports.user = function(req, res) {
  passport.authenticate('access', { session: false }, (err, user) => {
    if (err) { return res.status(403).json({ user: null }) }
    if (!user.enable) { return res.status(403).json({ user: null }) }
    res.status(200).json({ user: user })
  })(req, res)
}

module.exports.refresh = function(req, res) {
  passport.authenticate('refresh', { session: false }, (err, user, payload) => {
    if (err||!user) return res.status(403).json({ user: null })
    const time1 = moment()
    const time2 = moment(payload.exp * 1000)
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '5m'})
    
    if (moment.duration(time2.diff(time1)).asDays() < 1) {
      const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d'})
      return res.status(200).json({ refreshToken: refreshToken, accessToken: accessToken, user: user })
    }
    res.status(200).json({ accessToken: accessToken, user: user })
  })(req, res)
}

module.exports.logout = function(req, res) {
  req.logout()
  return res.status(200).json({
    message: 'Logout complate',
    user: null
  })
}

module.exports.users = async function(req, res) {
  passport.authenticate('access', { session: false }, async (err, user) => {
    if (err) { return res.status(403).json({ user: null }) }
    if (!user.admin) { return res.status(403).json({ users: null }) }
    const users = await User.find({})
    res.status(200).json({ users: users })
  })(req, res)
}

// module.exports.update = async function(req, res) {
//   passport.authenticate('access', { session: false }, async (err, user) => {
//     if (err) { return res.status(403).json({ user: null }) }
//     if (!user.admin) { return res.status(403).json({ users: null }) }

//     console.log(req.body)
//     await User.updateOne({ email: req.body.email }, { $set: req.body.update })
//     const users = await User.find({})
//     res.status(200).json({ users: users })
//   })(req, res)
// }