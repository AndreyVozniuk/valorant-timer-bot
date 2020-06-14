process.env['NTBA_FIX_319'] = 1 // for work bot without exceptions

const TelegramBot = require('node-telegram-bot-api')
const helper = require('./helpers')
const keyboard = require('./keyboards')
const config = require('./config')
const db = require('./database')
const StartStop = require('./stopwatch')

const bot = new TelegramBot(config.TOKEN, {polling:true})

helper.logStarted()
db.connect()

const createDataDB = (lastSessionHours = '00:00:00', totalHours = '00:00:00', theLongestSession='00:00:00') => {
  return{
    lastSessionHours,
    totalHours,
    theLongestSession
  }
}

const editMessage = (str, query, keyboard) => {
  bot.editMessageText(str, {
    chat_id: query.from.id, 
    message_id: query.message.message_id,
    reply_markup: { inline_keyboard: keyboard }
  })
}

bot.onText(/\/start/, (msg) => {
  if (db.findUser(msg.from.username).length === 0) {
    db.createUser(msg.from.username)
  }

  bot.sendMessage(msg.chat.id, `Select option 💬 `, {
    reply_markup: { inline_keyboard: keyboard.start_keyboard },
  })
})

bot.on('callback_query', (query) => {
  switch(query.data){
    case 'showInfo':
      db.findUser(query.from.username).then( user => {
        editMessage(helper.getStats(user[0]).trim(), query, keyboard.toOptions_keyboard)
      })
      break
    case 'backToOprions':
      editMessage('Select option 💬', query, keyboard.start_keyboard)
      break
    case 'setterGameHours':
      editMessage('Please enter your hours in the game: ', query, keyboard.toOptions_keyboard)
      bot.on('message', msg => {
        if( /^\d+$/.test( msg.text.trim() ) ){
          helper.UpdateDataInDB( createDataDB(`${msg.text}:00:00`) )
          bot.answerCallbackQuery(query.id, 'Hours were written successfully!')
          bot.removeListener()
          editMessage('Select option 💬', query, keyboard.start_keyboard)
        }else{
          bot.sendMessage(msg.chat.id, 'you wrote not only numbers, please try again')
        }
      })
      break
    case 'runTimer':
      StartStop()
      editMessage('monitoring game session started!', query, keyboard.quit_keyboard)
      break
    case 'endSession':
      const sessionDuration = StartStop()
      db.updateUserData(query.from.username, createDataDB(sessionDuration))
      editMessage(`Your in-game session lasted: ${sessionDuration} `, query, keyboard.toOptions_keyboard)
      break
  }
})

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, helper.getDescription())
})
