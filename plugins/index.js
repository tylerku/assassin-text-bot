const { response } = require('express');
const fs = require('fs');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const config = require('./../config/config.json');
const rules = require('./rules');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const { getUserCommandFromRequest } = require('../utils')

// DO NOT DELETE
// This object gets plugins added to it from the plugin 
// files in the plugins folder. 
const plugins = {} 

// These key values represent 
// {
//    <user supplied text command>: <name of file where plugin lives>
// }
const userCommands = {
  'textblast': 'textblast',
  'down': 'down',
  'out': 'out',
  "rules": 'rules',
  "i killed": 'userKilled',
  "i was killed": 'userDeath',
  "contact:": 'contact'
}

const normalPath = require('path').join(__dirname);

fs.readdir(normalPath, (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach(fileName => {
    if (fileName != 'index.js') {
      const pluginName = fileName.replace('.js', '');
      plugins[pluginName] = require('./' + fileName);
    }
  });
});

const methods = {
  handle: (request, response) => {
    const command = getUserCommandFromRequest(request, Object.keys(userCommands))
    console.log('Received command ', command, ' from ', request.From)
    if (userCommands.hasOwnProperty(command)) {
      plugins[userCommands[command]].run(request, response);
      console.log(`Executing pluggin ${userCommands[command]} for ${request.From}.`);
    } else {
      const twiml = new MessagingResponse();
      console.log(
        `Received invalid command ${request.Body} from ${request.From}.`
      );
      twiml.message(
        `Sorry, that's an invalid command.`
      );
      response.send(twiml.toString());
    }
  }
};

module.exports = methods;
