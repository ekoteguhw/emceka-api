const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  avatar: String,
  description: String,
  userId: String,
  email: String,
  passwordHash: String,
})

module.exports = mongoose.model('User', UserSchema)
