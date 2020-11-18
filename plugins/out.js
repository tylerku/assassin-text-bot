const { sendResponseText } = require('../utils')

module.exports = {
  run: (req, res) => {
    sendResponseText('We\'ll miss you. Goodbye.')
  }
}