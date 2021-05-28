const passport = require('passport')
const path =require('path')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '../../.env') })

module.exports.register = async function (req, res) {
  console.log(req.body)
  const chkEmail = await User.findOne({ email: req.body.email })
  if (chkEmail) return res.status(403).json({ message: '이미 가입된 이메일 입니다.' })

  const user = new User({
    id: req.body.email,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    provider: 'local',
    admin: false,
    createAt: Date.now(),
    level: 0
  })

  user.save((err, user) => {
    if (err) return res.status(500).json({
      message: 'Error on register'
    })
    return res.status(200).json({
      message: 'user save complate'
    })
  })
}

module.exports.login = function (req, res) {
  passport.authenticate('local', {
    session: false
  }, (err, user, info) => {
    if (err || !user) return res.status(401).json({
      message: 'Error! user not found',
      info: info
    })

    req.login(user, {
      session: false
    }, (error) => {
      if (error) return res.status(401).json({
        message: 'user error', error: error
      })
      
      const accessToken = jwt.sign({
        id: user.id
      }, process.env.JWT_SECRET, {
        expiresIn: '1m'
      })

      const refreshToken = jwt.sign({
        id: user.id
      }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      })

      User.updateOne({
        id: user.id
      }, {
        $set: {
          updateAt: Date.now(),
          refreshToken: refreshToken
        }
      }, {
        upsert: true
      }, (err) => {
        if (err) {
          console.log(err)
        }
        return res.status(200).json({
          accessToken: accessToken,
          refreshToken: refreshToken
        })
      })
    })
  })(req, res)
}

module.exports.getUser = function (req, res) {
  passport.authenticate('access', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(403).json({
        user: null,
        status: false,
        info: '사용자가 존재하지 않습니다.'
      })
    }
    res.status(200).json({
      user: user,
      status: true,
      info: info
    })
  })(req, res)
}

module.exports.isLoggedIn = (req, res, next) => {
  passport.authenticate('access', { session: false }, (err, user, info) => {
    if (user) {
      req.user = user
      next()
    } else {
      res.status(401).json({
        user: null,
        status: false,
        info: '로그인 되지 않았습ㄴ디ㅏ.'
      })
    }
  })(req, res, next)
}

module.exports.refresh = function (req, res) {
  passport.authenticate('refresh', { session: false }, async (err, user, payload) => {
    if (err||!user) return res.status(401).json({ user: null })
    const time1 = moment()
    const time2 = moment(payload.exp * 1000)
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1m'})
    
    if (moment.duration(time2.diff(time1)).asDays() < 1) {
      const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

      await User.updateOne({ id: user.id }, { $set: { updateAt: Date.now, refreshToken: refreshToken }})
      return res.status(201).json({ refreshToken: refreshToken, accessToken: accessToken, user: user })
    }
    res.status(201).json({ accessToken: accessToken, user: user })
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
    if (err) { return res.status(401).json({ user: null }) }
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