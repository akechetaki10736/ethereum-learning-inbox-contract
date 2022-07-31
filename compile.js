const path = require('path');
const fs = require('fs'); //fs = fileSystem
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
        content: source
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };


// https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/learn/lecture/28943812#questions
module.exports = JSON.parse(solc.compile(JSON.stringify(input)))
    .contracts['Inbox.sol']
    .Inbox;