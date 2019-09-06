var abi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "Items",
    "outputs": [
      {
        "name": "lender",
        "type": "address"
      },
      {
        "name": "currentBorrower",
        "type": "address"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "description",
        "type": "string"
      },
      {
        "name": "lenderAddress",
        "type": "string"
      },
      {
        "name": "deposit",
        "type": "uint256"
      },
      {
        "name": "rentalFee",
        "type": "uint256"
      },
      {
        "name": "dealCount",
        "type": "uint256"
      },
      {
        "name": "state",
        "type": "uint8"
      },
      {
        "name": "image",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x17b47cc4"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "itemId",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xca6158cb"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "itemId",
        "type": "uint256"
      }
    ],
    "name": "ExhibitDone",
    "type": "event",
    "signature": "0x73023c370d5ed730e8cc7a99a97cb6cbde62283b4fb0eceb03e42ab4b712fe48"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_description",
        "type": "string"
      },
      {
        "name": "_lenderAddress",
        "type": "string"
      },
      {
        "name": "_deposit",
        "type": "uint256"
      },
      {
        "name": "_rentalFee",
        "type": "uint256"
      },
      {
        "name": "imageURL",
        "type": "string"
      }
    ],
    "name": "exhibit",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x75ad5215"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_itemId",
        "type": "uint256"
      },
      {
        "name": "_borrowerAddress",
        "type": "string"
      }
    ],
    "name": "borrowRequest",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function",
    "signature": "0xc261d07c"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_numDeals",
        "type": "uint256"
      },
      {
        "name": "_trackingNumber1",
        "type": "uint256"
      }
    ],
    "name": "shipping",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xd8b4ca4a"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_numDeals",
        "type": "uint256"
      }
    ],
    "name": "borrowRequestUnapproved",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x88c178ef"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_numDeals",
        "type": "uint256"
      },
      {
        "name": "_trackingNumber2",
        "type": "uint256"
      }
    ],
    "name": "sendback",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x89b3d085"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_numDeals",
        "type": "uint256"
      }
    ],
    "name": "sell",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xe4849b32"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_numDeals",
        "type": "uint256"
      }
    ],
    "name": "completeDeal",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xdec3456b"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_numDeals",
        "type": "uint256"
      }
    ],
    "name": "completeDealByBorrower",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xdff474eb"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getNumItem",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x34bc698b"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_itemId",
        "type": "uint256"
      }
    ],
    "name": "getItemById",
    "outputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xcd2f0710"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_itemId",
        "type": "uint256"
      }
    ],
    "name": "getItemByIdForMain",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x9ebbd893"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_itemId",
        "type": "uint256"
      }
    ],
    "name": "getNumDealsById",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xdcf4bc53"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_numDeals",
        "type": "uint256"
      }
    ],
    "name": "getDealByNumDeals",
    "outputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x84e84363"
  }
];

var address = "0x8f41a72d39BE4a0a5Bb06cD9Dab7b70945357F72";
//"0x8f41a72d39BE4a0a5Bb06cD9Dab7b70945357F72" is in Ropsten

//var web3Local = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));


// コントラクトを呼び出すアカウントのアドレスを取得する


//MetaMaskがインストールされているかのチェック
if (typeof web3 !== 'undefined') {
  // メタマスクのWeb3プロバイダを使用する。
  web3js = new Web3(web3.currentProvider);
  console.log("new web3 instance");
} else {
  // メタマスクがインストールされていない場合、メタマスクのインストールを促す
  alert("メタマスクをインストールしてください。");
}


var eventContract = web3js.eth.contract(abi).at(address);//web3Local.eth.contract(abi).at(address);//ローカルでやるとき

var contract = web3js.eth.contract(abi).at(address);

/*
        var userAccount;//追加

        function startApp() {
          //この関数に追加します。
          //コントラクトの作成
          var contract = new web3js.eth.Contract(abi).at(address);
          var eventContract = web3js.eth.contract(abi).at(address);//web3Local.eth.contract(abi).at(address);//ローカルでやるとき

          //ユーザーの登録
          web3.eth.getAccounts(function(err, accounts) {
            console.log(accounts[0]);
            userAccount = accounts[0];
          });
          //userAccount = web3.eth.accounts[0]; //CryptoZombiesなどはこれで取得しているが、、、
        }

        //MetaMaskがインストールされているかのチェック
        if (typeof web3 !== 'undefined') {
          // メタマスクのWeb3のプロバイダを使用する。
          web3js = new Web3(web3.currentProvider);
          alert("起動");
        } else {
          // メタマスクがインストールされていない場合、メタマスクのインストールを促す
          alert("メタマスクをインストールしてください。");
        }

        // ユーザーのアプリ開始
        startApp()
*/
