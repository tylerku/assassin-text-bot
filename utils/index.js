const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(accountSid, authToken);

const sendResponseText = (res, text) => {
  const twiml = new MessagingResponse();
  twiml.message(text)
  res.send(twiml.toString());
}

const getUserCommandFromRequest = (req, possibleCommands) => {
  const textMessageBody = req.Body.toLowerCase();
  const mostPossibleWordsInCommand = 4;
  let currentNumWordsAttempt = mostPossibleWordsInCommand
  while (currentNumWordsAttempt > 0) {
    const words = textMessageBody.split(' ').slice(0, currentNumWordsAttempt)
    const command = words.join(' ')
    if (possibleCommands.includes(command)) {
      return command 
    }
    currentNumWordsAttempt -= 1
  }
}

const sendTextMessage = (message, toPerson, fromPerson) => {
  return twilioClient.messages
    .create({
      body: message,
      from: fromPerson,
      to: toPerson
    })
}

module.exports = {
  sendResponseText,
  getUserCommandFromRequest,
  sendTextMessage
}