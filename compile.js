const path = require('path');
const fs = require('fs'); //fs = fileSystem
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');


//module.exports 可以讓編譯完成的檔案馬上被存取。
//如果一個專案有多個檔案多個合約，冒號前面的名稱就是儲存該合約原始碼的檔案名稱。
//假如我們的合約撰寫在一個名叫InboxContract的檔案中，程式碼則會如下
// module.exports = solc.compile(source, 1).contracts['InboxContract:Inbox']; 
module.exports = solc.compile(source, 1).contracts[':Inbox']; 
