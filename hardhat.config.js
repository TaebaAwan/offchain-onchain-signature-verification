require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const privatekey1=process.env.Private_Key;

/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.24",
// };

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "Sepolia",
  networks: {
    hardhat: {
    },
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [privatekey1]
    },
    BNB: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: [privatekey1]
  },
    BSCscan: {
      url: "https://rpc.ankr.com/bsc",
      accounts: [privatekey1]
    },
    Sepolia: {
      url: "https://rpc.sepolia.org",
      accounts: [privatekey1]
    },
    fantom: {
      url: "https://rpc.testnet.fantom.network/",  
      accounts: [privatekey1]
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [privatekey1]
    },
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200 
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 90000
  },
  etherscan: {

   apiKey: process.env.Etherscan_API_key 
  },
};


