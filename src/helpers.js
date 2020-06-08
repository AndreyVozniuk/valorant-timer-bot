const fs = require('fs')
const stats = require('./analogDB.json')

const checkZero = (time) => {
  if( String(time).length === 1)
    return `0${time}`
  else
    return time
}

module.exports = {
  getDescription: () => {
    let description = ''
    const lines = fs.readFileSync('./files_txt/description.txt').toString().split('\n')
    lines.forEach((el) => { description += el })
    return description
  },

  logStarted: () => {
    console.log('Bot has been started!')
  },

  getStats: () => {
    const statisctic = JSON.parse(JSON.stringify(stats))
    return `Total time in the game - ${statisctic.totalHours}\nTime in the last session - ${statisctic.lastSessionHours}`
  },

  UpdateDataInDB: (data) => {
    fs.writeFileSync('./src/analogDB.json', JSON.stringify(data))
  },

  addTimeToTotalHour: (timeLastSes) => {
    const statisctic = JSON.parse(JSON.stringify(stats))
    const totalTime = statisctic.totalHours.split(':')
    const timeLastSession = timeLastSes.split(':')

    let newTotalHour = Number(totalTime[0]) + Number(timeLastSession[0])

    let newTotalMinutes = Number(totalTime[1]) + Number(timeLastSession[1])
    if( Number(totalTime[1]) + Number(timeLastSession[1]) > 59 ){
      newTotalHour += 1
      newTotalMinutes -= 60 
    }

    let newTotalSeconds = Number(totalTime[2]) + Number(timeLastSession[2])
    if( Number(totalTime[2]) + Number(timeLastSession[2]) > 59 ){
      newTotalMinutes += 1
      newTotalSeconds -= 60 
    }
    
    const newTotalTime = `${checkZero(newTotalHour)}:${checkZero(newTotalMinutes)}:${checkZero(newTotalSeconds)}`
    return newTotalTime
  }
}

