const passport = require('passport')
const path =require('path')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '../../.env') })

module.exports.users = function(req, res) {
  passport.authenticate('access', { session: false }, async (err, user) => {
    try {
      if (err) { return res.status(401).json({ status: 'error', users: null }) }
      if (!user.admin) { return res.status(403).json({ status: 'error', users: null }) }
      const users = await User.find({})
      res.status(200).json({ status: 'seccess', users: users })
    } catch (err) {
      res.status(500).json({ status: err, users: null })
    }
  })(req, res)
}

module.exports.updateAdmin = function (req, res) {
  passport.authenticate('access', { session: false }, async (err, user) => {
    try {
      if (err) { return res.status(401).json({ users: null }) }
      if (!user.admin) { return res.status(403).json({ users: null }) }
      if (req.body.email === 'jkjh82@gmail.com') return res.status(403).json({ status: 'error', value: 'Super User!'})
      const r = await User.updateOne({ _id: req.body._id }, { $set: { admin: !req.body.admin } })
      const users = await User.find({})
      res.status(200).json({ status: 'success', users: users, value: r })
    } catch (err) {
      res.status(500).json({ status: 'error' })
    }
  })(req, res)
}

module.exports.updateLevel = function (req, res) {
  passport.authenticate('access', { session: false }, async (err, user) => {
    try {
      if (err) { return res.status(401).json({ users: null }) }
      if (!user.admin) { return res.status(403).json({ users: null }) }
      const r = await User.updateOne({ _id: req.body._id }, { $set: { level: req.body.level } })
      const users = await User.find({})
      res.status(200).json({ status: 'success', users: users, value: r })
    } catch (err) {
      res.status(500).json({ status: 'error' })
    }
  })(req, res)
}

module.exports.delelteUser = function (req, res) {
  passport.authenticate('access', { session: false }, async (err, user) => {
    try {
      if (err) { return res.status(401).json({ users: null }) }
      if (!user.admin) { return res.status(403).json({ users: null }) }
      if (req.body.email === 'jkjh82@gmail.com') return res.status(403).json({ status: 'error', value: 'Super User!'})
      const r = await User.findByIdAndRemove(req.body._id)
      const users = await User.find({})
      res.status(200).json({ status: 'success', users: users, value: r })
    } catch (err) {
      res.status(500).json({ status: 'error' })
    }
  })(req, res)
}
