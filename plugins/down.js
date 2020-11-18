const { sendResponseText } = require('../utils')

module.exports = {
  // if a person has already responded, tell them that they can't use this endpoint anymore
  run: (req, res) => {
    sendResponseText(res, 'Your frist target... Dylan Wiseman. May the odds be ever in your favor.')
  }
}