const { Web3 } = require('web3');
require('dotenv').config();


const rpcURL = process.env.RPC-URL;
const web3 = new Web3(rpcURL);

const address = '0xaEc0ae56d3A3BeE945FF21380a832a6a40bf8a48'; 
const message = "This is the message to be signed";

let privateKey = process.env.Private_Key;
if (!privateKey || privateKey.length !== 64) {
    console.error("Invalid Private Key. Please check your .env file.");
    process.exit(1);
}
privateKey = '0x' + privateKey.trim();

// Function to sign a message thru web3.js
async function signMessage(message, privateKey) {
    const { signature } = web3.eth.accounts.sign(message, privateKey);
    console.log("Signed Message:", signature);
    return signature;
}

// Function to verify the signature
async function verifySignature(message, signature) {
    const signerAddress = web3.eth.accounts.recover(message, signature);
    return signerAddress;
}

(async () => {
    try {
        const signedMessage = await signMessage(message, privateKey);
    
        const recoveredAddress = await verifySignature(message, signedMessage);
        
        console.log("Original Address:", address);
        console.log("Recovered Address:", recoveredAddress);
    } catch (error) {
        console.error("Error:", error);
    }
})();
