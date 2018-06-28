const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  UID: { type: String},
  userName: {type: String}
})

const User = mongoose.model('User', UserSchema)


module.exports = User