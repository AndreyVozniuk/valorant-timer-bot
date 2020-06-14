const fs = require('fs')

const _timeParse = (time) => {
  const parseTime = time.split(':')
  return `${parseTime[0]}h ${parseTime[1]}m`
}

module.exports = {
  getDescription: () => {
    let description = ''
    const lines = fs.readFileSync('./private_files/description.txt').toString().split('\n')
    lines.forEach((el) => { description += el })
    return description
  },

  logStarted: () => {
    console.log('Bot has been started!')
  },

  getStats: (user) => {
    return `Total time in the game - ${_timeParse(user.totalHours)}\n` + 
    `Time in the last session - ${_timeParse(user.lastSessionHours)}\n` +
    `The longest session - ${_timeParse(user.theLongestSession)}`
  }
}

