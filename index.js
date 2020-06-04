process.env['NTBA_FIX_319'] = 1 // for work bot without exceptions

const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs')
const getDescription = require('./helpers')

console.log('Bot has been started!')

const TOKEN = fs.readFileSync('token.txt', 'utf8')

const bot = new TelegramBot(TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params:{
      timeout: 10
    }
  }
})

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `Hello, ${msg.from.first_name}, the bot is under development, he will be great, just wait =)`)
})

bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, getDescription())
})