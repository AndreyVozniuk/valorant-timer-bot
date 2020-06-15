module.exports = {
  start_keyboard: [
    [
      {
        text: 'Set your game hours ⏱',
        callback_data: 'setterGameHours',
      }
    ],
    [
      {
        text: 'Monitor game session ⏳',
        callback_data: 'runTimer',
      }
    ],
    [
      {
        text: 'Show info 📊',
        callback_data: 'showInfo',
      }
    ],
    [
      {
        text: 'Reset info 💥',
        callback_data: 'resetInfo',
      }
    ]
  ],
  toOptions_keyboard: [
    [
      {
        text: 'Back to options ⬅️',
        callback_data: 'backToOprions',
      }
    ]
  ],
  quit_keyboard: [
    [
      {
        text: 'End the game session 🎮',
        callback_data: 'endSession',
      }
    ]
  ],
  confirm_keyboard: [
    [
      {
        text: 'Yes ✅',
        callback_data: 'confirmReset',
      }, 
      {
        text: 'No ❌',
        callback_data: 'notConfirmReset',
      }, 
    ]
  ],
}
