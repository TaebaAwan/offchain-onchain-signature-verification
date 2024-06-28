const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("VerifySignature", (m) => {

  const signature = m.contract("VerifySignature");

  return { signature };
});

