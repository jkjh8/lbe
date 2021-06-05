const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
// mongoose.set('useCreateIndex', true)

const userSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: { type: String },
  nickname: { type: String },
  profile_image: { type: String},
  email: { type: String },
  password: { type: String, bcrypt: true},
  admin: { type: Boolean, default: false},
  level: { type: Number, default: 0 },
  provider: { type: String },
  preset: { type: Array },
  createAt: { type: Date },
  updateAt: { type: Date },
  loginAt: { type: Date }
})

userSchema.plugin(require('mongoose-bcrypt')), { rounds: 10 }
const User = mongoose.model('User', userSchema)

module.exports = User
