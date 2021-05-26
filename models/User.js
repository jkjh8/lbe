const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const userSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: { type: String },
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String, bcrypt: true},
  admin: { type: Boolean, default: false},
  level: { type: Number, default: 0 },
  roles: { type: Array },
  provider: { type: String },
  kakao: { type: Object },
  createAt: { type: Date },
  updateAt: { type: Date }
})
userSchema.plugin(require('mongoose-bcrypt')), { rounds: 10 }
const User = mongoose.model('User', userSchema)

module.exports = User
