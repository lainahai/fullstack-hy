const mongoose = require('mongoose')

const User = mongoose.model('User', {
  username: String,
  passwordHash: String,
  over18: Boolean
})

module.exports = User