const passport = require("passport")
const passportJWT = require("passport-jwt")
const bcrypt = require("bcrypt")
const path = require('path')
const dotenv = require('dotenv')
const moment = require('moment')

dotenv.config({ path: path.join(__dirname, '../../.env') })

const JWTStrategy = passportJWT.Strategy
const { ExtractJwt } = passportJWT

const LocalStrategy = require("passport-local").Strategy

const Users = require("../../models/User") //load db

const LocalOption = { usernameField: 'id', passwordField: 'password' }
const jwtOption = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

async function localVerify (id, password, done) {
  let user
  try {
    user = await Users.findOne({ id: id }, { _id: 0 })

    // not user
    if (!user) return done(null, false, { message: 'Incorrect username' })

    // chk password
    const isSamePassword = await bcrypt.compare(password, user.password)
    if (!isSamePassword) return done(null, false, { message: 'Incorrect password' })

    return done(null, user)
  } catch (err) {
    done(err)
  }
}

async function jwtVerift (payload, done) {
  let user
  try {
    user = await User.findOne({ id: payload.id }, { _id: 0 })
    if (!user) return done(null, false, { message: 'not find user'})
    return done(null, user)
  } catch (err) {
    return done(err)
  }
}

async function refreshVerift (payload, done) {
  let user
  try {
    user = await User.findOne({ id: payload.id })
    if (!user) return done(null, false)
    return done(null, user, payload)
  } catch (err) {
    return done(err)
  }
}

module.exports = () => {
  passport.use(new LocalStrategy(LocalOption, localVerify))
  passport.use('access', new JWTStrategy(jwtOption, jwtVerift))
  passport.use('refresh', new JWTStrategy(jwtOption, refreshVerift))
}
