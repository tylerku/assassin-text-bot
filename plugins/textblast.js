const { sendResponseText, sendTextMessage } = require('../utils')


module.exports = {
  run: async (req, res) => {
    if (req.From != "+17244064427") {
      sendResponseText(res, `You are not allowed to use this command`)
    }
    const messageBody = `
    Congratulations. You have been selected to participate in a secret game of covid assassian. You and 99 of your closest friends and acquaintances have also received this message. The game will have a $1000 pot. Winner take all. We've asked your friend Tanner Green to handle the pot. You will have 24 hours accept our invitation or we will remove you from consideration.\n\nTo accept: respond with \'down\' to this message and venmo @Tanner-Green-22 $11 to buy in.\n\nTo deny: Respond to this message with \'out\'.\n\nRespond with \'rules\' to know the rules of the game.
    `
    let config;
    try {
      config = require('../config/config.json')
    } catch(err) {
      return sendResponseText(res, `error loading config file. error: ${err}`)
    }
    const allNumbers = config.twilio.allowedNumbers
    allNumbers.forEach(async number => {
      await sendTextMessage(messageBody, number, config.twilio.phoneNumber)
      .then(() => success(number))
      .catch(err => failed(err, number))
    })
    sendResponseText(res, 'finished sending all invitation texts')
    
    const success = number => {
      console.log(`successfully sent invitation message to ${number}`)
    }

    const failed = (err, failedNumber) => {
      console.error(`failed to send invitation message to ${failedNumber}. Error: `, err)
    };
  }
}