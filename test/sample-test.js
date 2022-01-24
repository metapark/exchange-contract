const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Exchange", function () {
  // it("Should return the new greeting once it's changed", async function () {
  //   const Greeter = await ethers.getContractFactory("Greeter");
  //   const greeter = await Greeter.deploy("Hello, world!");
  //   await greeter.deployed();
  //
  //   expect(await greeter.greet()).to.equal("Hello, world!");
  //
  //   const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
  //
  //   // wait until the transaction is mined
  //   await setGreetingTx.wait();
  //
  //   expect(await greeter.greet()).to.equal("Hola, mundo!");
  // });
  //

  it("test for exchange", async function () {
    const [owner, signer1, signer2, signer3, signer4, signer5, signer6, , signer7] = await ethers.getSigners();

    const MTS = await ethers.getContractFactory("MTS");
    const Exchange = await ethers.getContractFactory("Exchange");

    const mts = await MTS.deploy(signer1.address);
    await mts.deployed();

    const exchange = await Exchange.deploy(100, signer1.address, mts.address);
    await exchange.deployed();

    console.log("mts address: ", mts.address, " exchange address: ", exchange.address);

    //1. show eth amount
    let b1 = await signer1.getBalance();
    let b2 = await signer2.getBalance();
    let b3 = await signer3.getBalance();
    let b4 = await signer4.getBalance();
    console.log("eth balance: signer1: ", ethers.utils.formatEther(b1)," signer2: ", ethers.utils.formatEther(b2), " signer3: ", ethers.utils.formatEther(b3), " signer4: ", ethers.utils.formatEther(b4));

    let m1 = await mts.balanceOf(signer1.address);
    let m2 = await mts.balanceOf(signer2.address);
    let m3 = await mts.balanceOf(signer3.address);
    let m4 = await mts.balanceOf(signer4.address);
    console.log("mts balance: signer1: ", ethers.utils.formatEther(m1), " signer2: ", ethers.utils.formatEther(m2), " signer3: ", ethers.utils.formatEther(m3), " signer4: ", ethers.utils.formatEther(m4))

    //2. cfo approve exchange contract  1000000 of mts
    await mts.connect(signer1).approve(exchange.address, ethers.utils.parseEther("1000000"));

    //3. exchange 10 for mts
    const amt = ethers.utils.parseEther("10.0");
    await exchange.connect(signer2).exchange({value: amt});
    await exchange.connect(signer3).exchange({value: amt});
    await exchange.connect(signer4).exchange({value: amt});

    //4. show eth amount
    b1 = await signer1.getBalance();
    b2 = await signer2.getBalance();
    b3 = await signer3.getBalance();
    b4 = await signer4.getBalance();
    console.log("eth balance: signer1: ", ethers.utils.formatEther(b1), " signer2: ", ethers.utils.formatEther(b2), " signer3: ", ethers.utils.formatEther(b3), " signer4: ", ethers.utils.formatEther(b4));

    m1 = await mts.balanceOf(signer1.address);
    m2 = await mts.balanceOf(signer2.address);
    m3 = await mts.balanceOf(signer3.address);
    m4 = await mts.balanceOf(signer4.address);
    console.log("mts balance: signer1: ", ethers.utils.formatEther(m1) ," signer2: ", ethers.utils.formatEther(m2), " signer3: ", ethers.utils.formatEther(m3), " signer4: ", ethers.utils.formatEther(m4));

    // expect(m1).to.equal(ethers.utils.parseEther("1000.0"));
    expect(m2).to.equal(ethers.utils.parseEther("1000.0"));
    expect(m3).to.equal(ethers.utils.parseEther("1000.0"));
    expect(m4).to.equal(ethers.utils.parseEther("1000.0"));

  });

});
