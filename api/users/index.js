const passport = require('passport')
const path =require('path')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '../../.env') })

module.exports.register = async function (req, res) {
  console.log(req.body)
  const chkId = await User.findOne({ id: req.body.id })
  if (chkId) return res.status(403).json({ message: '이미 가입되었습니다.' })

  const user = new User(req.body)

  user.save((err, user) => {
    if (err) return res.status(500).json({
      message: 'Error on register',
      error: err
    })
    return res.status(200).json({
      message: 'user save complate'
    })
  })
}

module.exports.loginOauth = async function (req, res) {
  if (req.body.email) {
    const user = await User.findOne({ id: req.body.id })
    if (user) {
      const userInfo = {
        id: user.id,
        email: user.email
      }
      const accessToken = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '5m' })
      const refreshToken = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '7d' })
      User.updateOne({ id: user.id }, { $set: { loginAt: Date.now() } }, { upsert: true }, (err) => {
        if (err) { return console.log(err) }
        res.cookie('accessToken', accessToken, { httpOnly: true })
        if (req.body.keepLoggedIn) {
          const now = new Date()
          const date = new Date(now.setMonth(now.getMonth() + 1))
          res.cookie('refreshToken', refreshToken, { httpOnly: true, expires: date })
        } else {
          res.cookie('refreshToken', refreshToken, { httpOnly: true })
        }
        return res.status(200).end()
      })
    } else {
      res.status(404).json({
        error: true,
        info: {
          user: null,
          status: false,
          message: '사용자를 찾을 수 없습니다.'
        }
      })
    }
  } else {
    res.status(404).json({
        error: true,
        info: {
          user: null,
          status: false,
          message: '사용자를 확인할 수 없습니다. 다른 방법으로 시도해 주세요.'
        }
      })
  }
}

module.exports.login = function (req, res) {
  passport.authenticate('local', {
    session: false
  }, (err, user, info) => {
    console.log(err, user, info)
    if (err || !user) return res.status(404).json({
      message: 'Error! user not found',
      info: info
    })

    req.login(user, {
      session: false
    }, (error) => {
      if (error) return res.status(404).json({
        message: 'user error', error: error
      })
      
      const userInfo = {
        id: user.id,
        email: user.email
      }
      const accessToken = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '5m' })
      const refreshToken = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '7d' })

      User.updateOne({
        id: user.id
      }, {
        $set: {
          loginAt: Date.now()
        }
      }, {
        upsert: true
      }, (err) => {
        if (err) {
          console.log(err)
        }
        res.cookie('accessToken', accessToken, { httpOnly: true })
        if (req.body.keepLoggedIn) {
          const now = new Date()
          const date = new Date(now.setMonth(now.getMonth() + 1))
          res.cookie('refreshToken', refreshToken, { httpOnly: true, expires: date })
        } else {
          res.cookie('refreshToken', refreshToken, { httpOnly: true })
        }
        return res.status(200).end()
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
        info: '로그인 되지 않았습니다.'
      })
    }
  })(req, res, next)
}

module.exports.refresh = function (req, res) {
  passport.authenticate('refresh', { session: false }, (err, user, payload) => {
    if (err||!user) return res.status(401).json({ user: null })
    const userInfo = {
      id: user.id,
      email: user.email
    }
    const time1 = moment()
    const time2 = moment(payload.exp * 1000)
    const accessToken = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '5m' })
    res.cookie('accessToken', accessToken, { httpOnly: true })
    if (moment.duration(time2.diff(time1)).asDays() < 1) {
      const refreshToken = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '7d' })
      res.cookie('refreshToken', refreshToken, { httpOnly: true })
      return res.status(201).json({ user: user })
    }
    res.status(201).json({ user: user })
  })(req, res)
}

module.exports.logout = function(req, res) {
  console.log(req.cookies)
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')
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

module.exports.delUser = async function (req, res) {
  try {
    const user = req.body
    console.log(user)
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    req.logout()

    const result = await User.deleteOne({ email: user.email })
    if (result.deletedCount === 1) {
      return res.status(200).json({ success: true, message: 'delete user' })
    } else {
      return res.status(500).json({ success: false, message: 'Server error' })
    }
  } catch {
    res.status(500).json({ success: false, message: 'Server error' })
  }
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