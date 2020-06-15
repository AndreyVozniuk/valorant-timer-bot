const mongoose = require('mongoose')
const config = require('./config')
const userModel = require('./models/userModel')

function _addTimeToTotalHour(timeLastSes, timeTotal) {
  const totalTime = timeTotal.split(':')
  const timeLastSession = timeLastSes.split(':')

  let newTotalHour = Number(totalTime[0]) + Number(timeLastSession[0])

  let newTotalMinutes = Number(totalTime[1]) + Number(timeLastSession[1])
  if (Number(totalTime[1]) + Number(timeLastSession[1]) > 59) {
    newTotalHour += 1
    newTotalMinutes -= 60
  }

  let newTotalSeconds = Number(totalTime[2]) + Number(timeLastSession[2])
  if (Number(totalTime[2]) + Number(timeLastSession[2]) > 59) {
    newTotalMinutes += 1
    newTotalSeconds -= 60
  }

  const newTotalTime = `${_checkZero(newTotalHour)}:${_checkZero(newTotalMinutes)}:${_checkZero(newTotalSeconds)}`
  return newTotalTime
}

function _checkZero(time){
  if( String(time).length === 1)
    return `0${time}`
  else
    return time
}

module.exports = {
  connect: async () => {
    try {
      mongoose.connect(config.dbURL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      console.log('MongoDB connected!')
    } catch (e) {
      console.log('connect error:' + e)
    }
  },

  findUser: async (userId) => {
    return userModel.find({ userID: userId }, (err, user) => {
      if (err) return console.log(err)
      return user
    })
  },

  createUser: async (userId, userName) => {
    userModel.create({ userID: userId, telegramUserName: userName}, (err, user) => {
      if (err) return console.log(err)
      console.log("User created!", user)
    })
  },

  disconnect: async () => {
    mongoose.disconnect()
  },

  updateUserData: async (userId, data) => {
    userModel.findOne({ userID: userId }, (err, user) => {
      if (err) return console.log(err)
      let lastSession = ''
      data.lastSessionHours.split(':').forEach(str => {lastSession+=str})

      let longestSession = ''
      user.theLongestSession.split(':').forEach(str => {longestSession+=str})

      data.theLongestSession = Number(lastSession) > Number(longestSession) ? data.lastSessionHours : user.theLongestSession

      data.totalHours = _addTimeToTotalHour(data.lastSessionHours, user.totalHours)

      userModel.findOneAndUpdate({userID: userId}, data, {new:true}, (err, user) => {
        if(err) return console.log(err)
        console.log("Update user data:", user)
      })
    })
  },

  setUserHourInGame: async (userId, data) => {
    userModel.findOneAndUpdate({ userID: userId }, data, {new:true}, (err, user) => {
      if (err) return console.log(err)
      console.log("Update user hour:", user)
    })
  },

  resetUserData: async (userId, data) => {
    userModel.findOneAndUpdate({ userID: userId }, data, {new:true}, (err, user) => {
      if (err) return console.log(err)
      console.log("reset was successfully:", user)
    })
  }
}
