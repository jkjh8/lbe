const passport = require("passport")
const passportJWT = require("passport-jwt")
const bcrypt = require("bcrypt")
const path = require('path')
const dotenv = require('dotenv')
const moment = require('moment')

dotenv.config({ path: path.join(__dirname, '../../.env') })

const JWTStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt

const LocalStrategy = require("passport-local").Strategy

const Users = require("../../models/User") //load db

const LocalOption = { usernameField: 'id', passwordField: 'password' }

const jwtOption = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

const refOption = {
  jwtFromRequest: ExtractJwt.fromHeader('refreshtoken'),
  secretOrKey: process.env.JWT_SECRET
}


async function localVerify (id, password, done) {
  let user
  try {
    user = await Users.findOne({ id: id }, { _id: 0 })

    // not user
    if (!user) return done(null, false, { message: '사용자를 찾을 수 없습니다.' })

    // chk password
    const isSamePassword = await bcrypt.compare(password, user.password)
    if (!isSamePassword) return done(null, false, { message: '패스워드가 일치 하지 않습니다.' })

    return done(null, user)
  } catch (err) {
    done(err)
  }
}

async function jwtVerift(payload, done) {
  console.log('start jwt')
  Users.findOne({ email: payload.id }, { _id: 0, password: 0 }, function (err, user) {
    if (err) return done(err, false)
    if (!user) return done(null, false)
    return done(null, user)
  })
}

async function refreshVerift(payload, done) {
  let user
  console.log('refresh', user)
  try {
    user = await Users.findOne({ id: payload.id }, { _id: 0, password: 0 })
    if (!user) return done(null, false, { message: '사용자를 찾을 수 없습니다.' })
    return done(null, user, payload)
  } catch (err) {
    return done(err)
  }
}

module.exports = () => {
  passport.use('local', new LocalStrategy(LocalOption, localVerify))
  passport.use('access', new JWTStrategy(jwtOption, jwtVerift))
  passport.use('refresh', new JWTStrategy(refOption, refreshVerift))
}
