const express = require('express');
const router = express.Router();
const Genis = require("../models/Genis");
const Update = require("../models/Update");
const Delete = require("../models/Delete");
const Tx = require("../models/Transaction");


// Ethereum configuration
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/teochFL5M5Cc6eidkmI5"));
var Accounts = require('web3-eth-accounts');
var accounts = new Accounts('https://rinkeby.infura.io/teochFL5M5Cc6eidkmI5');

var abi = require('./abi');


var contractAddress = '0xFf59756E5A7A3CE03B6658BAB03a3a11C564abFd';
var mycontract = new web3.eth.Contract(abi, contractAddress);


// user 1
var u1_pk = "0x123ce564d427a3319b6536bbcef1390d69395b06es6c481954e971d960fe8907";
var u1_account = web3.eth.accounts.privateKeyToAccount(u1_pk);
var u1_address = u1_account[Object.keys(u1_account)[0]];

// user 2
var u2_pk = "0x124ce564d427a3319b6536bccef1390d69395b06es6c481954e971d960fe8908";
var u2_account = web3.eth.accounts.privateKeyToAccount(u2_pk);
var u2_address = u2_account[Object.keys(u2_account)[0]];

// user 3
var u3_pk = "0x125ce564d427a3319b6536bdcef1390d69395b06es6c481954e971d960fe8909";
var u3_account = web3.eth.accounts.privateKeyToAccount(u3_pk);
var u3_address = u3_account[Object.keys(u3_account)[0]];


// time converter
const time_converter = (time) =>{
  date1 = new Date(time*1000);
  return date1.toUTCString()
}


// get account information
router.get('/getinfo/:id', function(req,res){


  var number = req.params.id;
  switch(number){
    case "id:1":{

      mycontract.methods.getEvent(u1_address).call().then(function(Resp){
        res.send(Resp);
      })
      break;
    }

    case "id:2":{


      mycontract.methods.getEvent(u2_address).call().then(function(Resp){
        res.send(Resp);
      })
      break;
    }

    case "id:3":{

      mycontract.methods.getEvent(u3_address).call().then(function(Resp){
        res.send(Resp);
      })

      break;
    }
  }



  // balance.geoNear(
  //     {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
  //     {maxDistance: 100000, spherical: true}
  // ).then(function(data){
  //     res.send(data);
  // }).catch(next);
});


// get balance
router.get('/getbalance/:id', function(req,res){
  var number = req.params.id;
  switch(number){
    case "id:1":{

      web3.eth.getBalance(u1_address, function(e, result){
        return res.send(web3.utils.fromWei(result, 'ether') + "ether");
      })
      break;
    }

    case "id:2":{


      web3.eth.getBalance(u2_address, function(e, result){
        return res.send(web3.utils.fromWei(result, 'ether') + "ether");
      })
      break;
    }

    case "id:3":{

      web3.eth.getBalance(u3_address, function(e, result){
        return res.send(web3.utils.fromWei(result, 'ether') + "ether");

      })
      break;
    }
  }

})


//post information

router.post('/create', function(req,res,next){
  Genis.create(req.body).then(function(data){

    var getData = mycontract.methods.addEvent(web3.utils.asciiToHex(data.memo),data.payment).encodeABI();

    var signed_transaction = web3.eth.accounts.signTransaction(

      {
        to: contractAddress,
        data:getData,
        gas: 3000000
      }, data.privatekey).then(function(raw){

      web3.eth.sendSignedTransaction(raw[Object.keys(raw)[4]]).on('receipt', function(result){
        res.send(result);
    })

  })

  }).catch(next);
});


//update
router.put('/update', function(req,res,next){

  Update.create(req.body).then(function(data){

    var getData = mycontract.methods.updateEvent(Number(data.updateIndex), web3.utils.asciiToHex(data.memo),data.payment).encodeABI();

    var signed_transaction = web3.eth.accounts.signTransaction(

      {
        to: contractAddress,
        data:getData,
        gas: 3000000
      }, data.privatekey).then(function(raw){

      web3.eth.sendSignedTransaction(raw[Object.keys(raw)[4]]).on('receipt', function(result){
        var tx = new Tx(result);
        tx.save();
        res.send(result);
    })

  })
})


});


//delete
router.delete('/delete', function(req,res){


  Delete.create(req.body).then(function(data){

    var getData = mycontract.methods.deleteEvent(Number(data.deleteIndex)).encodeABI();

    var signed_transaction = web3.eth.accounts.signTransaction(

      {
        to: contractAddress,
        data:getData,
        gas: 3000000
      }, data.privatekey).then(function(raw){

      web3.eth.sendSignedTransaction(raw[Object.keys(raw)[4]]).on('receipt', function(result){
        res.send(result);
    })

  })
})

});


module.exports = router;
