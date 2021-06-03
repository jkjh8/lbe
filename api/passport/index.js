const passport = require("passport")
const bcrypt = require("bcrypt")
const path = require('path')
const dotenv = require('dotenv')

const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require("passport-local").Strategy

const Users = require("../../models/User") //load db
dotenv.config({ path: path.join(__dirname, '../../.env') })

const getAccessTokenFromCookie = function (req) {
  let token = null
  if (req && req.cookies) token = req.cookies['accessToken'];
  return token
}

const getRefreshTokenFromCookie = function (req) {
  let token = null
  if (req && req.cookies) token = req.cookies['refreshToken'];
  return token
}

const LocalOption = { usernameField: 'id', passwordField: 'password' }
const jwtOption = {
  jwtFromRequest: getAccessTokenFromCookie,
  secretOrKey: process.env.JWT_SECRET
}
const refOption = {
  jwtFromRequest: getRefreshTokenFromCookie,
  secretOrKey: process.env.JWT_SECRET
}

// 로컬 인증
async function localVerify(id, password, done) {
  let user
  try {
    Users.findOne({ id: id }, { _id: 0 }, (err, user) => {
      if (err) return done(err)
      if (!user) return done(null, false, { message: '사용자를 찾을 수 없습니다.' })
      if (bcrypt.compareSync(password, user.password)) {
          return done(null, user)
      } else {
        return done(null, false, { message: '패스워드가 일치 하지 않습니다.' })
      }
    })
  } catch (err) {
    return done(err)
  }
}

// JWT
async function jwtVerift(payload, done) {
  // let user
  // console.log('refresh', user)
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
  passport.use('refresh', new JWTStrategy(refOption, jwtVerift))
}
