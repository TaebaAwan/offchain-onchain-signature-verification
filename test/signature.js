const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("VerifySignature", function () {
  it("Check signature", async function () {
    const accounts = await ethers.getSigners(2)

    const VerifySignature = await ethers.getContractFactory("VerifySignature")
    const contract = await VerifySignature.deploy()
    await contract.waitForDeployment()

    const signer = accounts[0]
    const message = "Hello"

    const hash = await contract.getMessageHash( message)
    const sig = await signer.signMessage(ethers.utils.arrayify(hash))

    const ethHash = await contract.getEthSignedMessageHash(hash)

    console.log("signer          ", signer.address)
    console.log("recovered signer", await contract.recoverSigner(ethHash, sig))

    // Correct signature and message returns true
    expect(
      await contract.verify(signer.address, message,sig)
    ).to.equal(true)

    // Incorrect message returns false
    expect(
      await contract.verify(signer.address,  message, sig)
    ).to.equal(false)
  })
})