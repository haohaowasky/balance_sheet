module.exports = [
  
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "_memo",
  				"type": "bytes32"
  			},
  			{
  				"name": "_spending",
  				"type": "uint256"
  			}
  		],
  		"name": "addEvent",
  		"outputs": [
  			{
  				"name": "",
  				"type": "bool"
  			}
  		],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "index",
  				"type": "uint256"
  			}
  		],
  		"name": "deleteEvent",
  		"outputs": [
  			{
  				"name": "",
  				"type": "bool"
  			}
  		],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "index",
  				"type": "uint256"
  			},
  			{
  				"name": "_memo",
  				"type": "bytes32"
  			},
  			{
  				"name": "_spending",
  				"type": "uint256"
  			}
  		],
  		"name": "updateEvent",
  		"outputs": [
  			{
  				"name": "",
  				"type": "bool"
  			}
  		],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [
  			{
  				"name": "",
  				"type": "address"
  			},
  			{
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"name": "book",
  		"outputs": [
  			{
  				"name": "spending",
  				"type": "uint256"
  			},
  			{
  				"name": "time",
  				"type": "uint256"
  			},
  			{
  				"name": "memo",
  				"type": "bytes32"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [
  			{
  				"name": "_address",
  				"type": "address"
  			}
  		],
  		"name": "getEvent",
  		"outputs": [
  			{
  				"name": "",
  				"type": "uint256[]"
  			},
  			{
  				"name": "",
  				"type": "uint256[]"
  			},
  			{
  				"name": "",
  				"type": "bytes32[]"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	}

]
