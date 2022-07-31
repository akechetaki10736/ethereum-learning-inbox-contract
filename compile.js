const path = require('path');
const fs = require('fs'); //fs = fileSystem
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');


//module.exports 可以讓編譯完成的檔案馬上被存取。
module.exports = solc.compile(source, 1).contracts[':Inbox']; 
