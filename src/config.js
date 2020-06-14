const fs = require('fs')

module.exports = {
  TOKEN: fs.readFileSync('./private_files/TOKEN.txt', 'utf8'),
  dbURL: fs.readFileSync('./private_files/dbURL.txt', 'utf8')
}