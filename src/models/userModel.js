const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
  totalHours: {
    type: String,
    default: '00:00:00',
  },
  lastSessionHours: {
    type: String,
    default: '00:00:00'
  },
  theLongestSession: {
    type: String,
    default: '00:00:00'
  },
  telegramUserName: {
    type: String,
    required: true,
  }
})

module.exports = model('User', UserSchema)