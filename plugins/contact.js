const { sendResponseText } = require('../utils')

module.exports = {
  run: (req, res) => {
    // add text message, number, name, time, and respondedStatus to a row in a google sheet  
    // send myself a text so I know to review it and get back to them
    sendResponseText(res, 'Contact pluggin has not yet been implemented...')
  }
}