// npm install ganache-cli
// npm install web3
// npm install solc

const assert = require('assert');
const ganache = require('ganache-cli');
//此處Web3使用大寫開頭是慣例
//當使用require來呼叫web3時，web3回傳的是一個function，該function用來建構web3實例，也就是建構子，遇到這種情況時會使用大寫開頭來命名變數。
//關於require參考資料：https://dwatow.github.io/2018/02-13-js-module-require-exports/
const Web3 = require('web3'); 
//可以在一個專案裡創建多個web3實例來連接不同以太坊網路，但實務上少見。
//透過使用不同的provider作為參數，可以連接到不同以太坊網路，此處是連接到本地的使用ganache架設的測試網路。
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

let accounts;
let inbox;
let INITIAL_STRING = 'Hi there!'

beforeEach(async () => {
    // Get a list of all accounts
    // web3有很多關於不同加密貨幣的模組，此處我們使用以太坊的模組。
    // web3幾乎所有的方法都是非同步的，getAccounts()也一樣，此處它會回傳一個promise。
    // 此處使用promise做示範，以後將改用async/await
    // web3.eth.getAccounts()
    //     .then(fetchedAccounts => {
    //         console.log(fetchedAccounts);
    //     });

    accounts = await web3.eth.getAccounts();
    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({ 
            data: evm.bytecode.object, 
            arguments: [INITIAL_STRING]
        })
        .send({ from: accounts[0], gas: '1000000' });

});

describe('Inbox', () => {
    it('deploys a contract', () => {
        //assert.ok是用來檢查值存在與否
        assert.ok(inbox.options.address);
    })

    it('has a default message', async () => {
        //此處inobx代表合約實例，而我們要呼叫meessage()，該方法沒有參數
        //接著使用call()來呼叫，call()專門用來呼叫合約中不會提交交易的方法，換句話來說被呼叫的方法不會改變合約狀態
        const message = await inbox.methods.message().call();
        assert(message, INITIAL_STRING);
    })

    it('can change the message', async() => {
        //接著使用send()來呼叫，send()會提交交易，代表我們呼叫的合約方法會改變合約狀態
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert(message, 'bye');
    })
});




