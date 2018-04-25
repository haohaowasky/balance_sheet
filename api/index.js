
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/teochFL5M5Cc6eidkmI5"));
var Accounts = require('web3-eth-accounts');
var accounts = new Accounts('https://rinkeby.infura.io/teochFL5M5Cc6eidkmI5');

var abi = require('./abi'); // if this can be sent over would be great

var contractAddress = '0xFf59756E5A7A3CE03B6658BAB03a3a11C564abFd';
var mycontract = new web3.eth.Contract(abi, contractAddress);

// 用户账号1
var u1_pk = "0x123ce564d427a3319b6536bbcef1390d69395b06es6c481954e971d960fe8907";
var u1_account = web3.eth.accounts.privateKeyToAccount(u1_pk);
var u1_address = u1_account[Object.keys(u1_account)[0]];

// 用户账号2
var u2_pk = "0x124ce564d427a3319b6536bccef1390d69395b06es6c481954e971d960fe8908";
var u2_account = web3.eth.accounts.privateKeyToAccount(u2_pk);
var u2_address = u2_account[Object.keys(u2_account)[0]];

// 用户账号3
var u3_pk = "0x125ce564d427a3319b6536bdcef1390d69395b06es6c481954e971d960fe8909";
var u3_account = web3.eth.accounts.privateKeyToAccount(u3_pk);
var u3_address = u3_account[Object.keys(u3_account)[0]];



var account1 = {privatekey:u1_pk, address:u1_address};
var account2 = {privatekey:u2_pk, address:u2_address};
var account3 = {privatekey:u3_pk, address:u3_address};


// 时间转换
const time_converter = (time) =>{
  date1 = new Date(time*1000);
  return date1.toUTCString()
}


// 查余额
web3.eth.getBalance(u3_address, function(e, result){
  console.log(web3.utils.fromWei(result, 'ether') + "ether");
});



// 增加条目 memo: 话费细节， spending：具体多少钱， private_key: 哪个账户
function addEvent(memo,spending,private_key){
  var getData = mycontract.methods.addEvent(web3.utils.asciiToHex(memo),spending).encodeABI();

  var signed_transaction = web3.eth.accounts.signTransaction(

    {
      to: contractAddress,
      data:getData,
      gas: 3000000
    }, private_key).then(function(raw){

    web3.eth.sendSignedTransaction(raw[Object.keys(raw)[4]]).on('receipt', function(result){
      console.log(result);
  })

  })

}


// 收取数据
function getEvent(address){
  mycontract.methods.getEvent(address).call().then(function(Resp){
    Resp[Object.keys(Resp)[0]].forEach((paramValues, paramIndex) => {
      console.log("money spent: " + paramValues +  " dollars at event: " + web3.utils.hexToUtf8(Resp[Object.keys(Resp)[2]][paramIndex]) + " at time: " + time_converter(Resp[Object.keys(Resp)[1]][paramIndex]))
    })
  })

}

// 更新， index的意思是，更新第几个
function update(index, memo, spending, private_key){
  var getData = mycontract.methods.updateEvent(index, web3.utils.asciiToHex(memo),spending).encodeABI();
  var signed_transaction = web3.eth.accounts.signTransaction(

    {
      to: contractAddress,
      data:getData,
      gas: 3000000
    }, private_key).then(function(raw){

    web3.eth.sendSignedTransaction(raw[Object.keys(raw)[4]]).on('receipt', function(result){
      console.log(result);
    })

  })

}


// 删除
function deleteEvent(index, private_key){
  var getData = mycontract.methods.deleteEvent(index).encodeABI();
  var signed_transaction = web3.eth.accounts.signTransaction(

    {
      to: contractAddress,
      data:getData,
      gas: 3000000
    }, private_key).then(function(raw){

    web3.eth.sendSignedTransaction(raw[Object.keys(raw)[4]]).on('receipt', function(result){
      console.log(result);
    })

  })

}



//getEvent(u1_address);

//addEvent("football",90,u1_pk);

//update(0, "playing", 50, u1_pk);

//deleteEvent(0,u1_pk);
