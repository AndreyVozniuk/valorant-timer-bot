const fs = require('fs')

const getDescription = () => {
  let description = ''
  const lines = fs.readFileSync('description.txt').toString().split('\n')
  lines.forEach((el) => { description += el })
  return description
}
module.exports = getDescription
