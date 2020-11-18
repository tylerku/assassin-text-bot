const { sendResponseText } = require('../utils')

module.exports = {
  run: (req, res) => {
    const messageBody = `
      The game is simple. You will be assigned a target to \'kill\' at random. To kill them, you must squirt them with a squirt gun.\n\n
      1) The kill cannot occur at your target\'s place of work (including the building and immediately surrounding property ownded by their employer.)\n\n
      2) When the kill happens, you must text \'I killed <your target\'s first and last name>\'.\n\n
      3) The person you killed will then be asked if you killed them, they must respond with \'I was killed by <your fist and last name>\'.\n\n
      4) You will then be assigned to kill the person that your victim was assigned to prior to their death.\n\n
      5) Your team can buy you back into the game 1 time by sending @Tanner-Green-22 with the message \'I want to buy <your full name>\' back into the game.\n\n
      6) If someone else is bought back into the game, your target may change at a moments notice. Be on you toes.\n\n
      7) 
    `
    sendResponseText(res, messageBody)
  }
}