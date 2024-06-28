const contractAddress= "0xb49bC93054245eB52408F7AE9b895fA5a8651269";
const contractABI= [
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_messageHash",
          "type": "bytes32"
        }
      ],
      "name": "getEthSignedMessageHash",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_message",
          "type": "string"
        }
      ],
      "name": "getMessageHash",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_ethSignedMessageHash",
          "type": "bytes32"
        },
        {
          "internalType": "bytes",
          "name": "_signature",
          "type": "bytes"
        }
      ],
      "name": "recoverSigner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "sig",
          "type": "bytes"
        }
      ],
      "name": "splitSignature",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_signer",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_message",
          "type": "string"
        },
        {
          "internalType": "bytes",
          "name": "signature",
          "type": "bytes"
        }
      ],
      "name": "verify",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    }
  ];
const message = "This is the message to be signed";

window.onload= function(){
	if(window.ethereum !=="undefined"){
		this.ethereum.on('Accounts Changed', handleAccountsChanged)

		window.ethereum.request({method: "eth_accounts"})
		.then(handleAccountsChanged)
		.catch((err)=>{
			console.log(err);
		})
		console.log(provider);
	}
}

const handleAccountsChanged= (a) =>{
	console.log("Accounts Changed");
	accounts= a;
}

const queryBlockchainSync= async()=> {
    try {
        const block = await provider.getBlockNumber();
        console.log("Current Block is:", block);
    } catch (error) {
        console.error("Error querying blockchain:", error);
    }
}
async function connectWallet() {
    try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log(accounts);
    } catch (err) {
        console.log(err);
    }
}

async function signMessage() {
    try {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const messageHash = await contract.getMessageHash(message);

		const signedHash = await contract.getEthSignedMessageHash(messageHash);


        console.log("Signed Message Hash:", signedHash);
        return signedHash;
    } catch (err) {
        console.log(err);
    }
}

async function verifySignature() {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const messageHash = await contract.getMessageHash(message);
        const ethSignedMessageHash = await contract.getEthSignedMessageHash(messageHash);

        const signature = await signer.signMessage(ethers.utils.arrayify(messageHash));

        const recoveredSigner = await contract.recoverSigner(ethSignedMessageHash, signature);

        console.log("Recovered Signer Address:", recoveredSigner);
        return recoveredSigner;
    } catch (err) {
        console.log(err);
    }
}

