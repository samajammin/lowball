const { expect } = require("chai");
// TODO why doesn't this work?
// import { expect } from "chai";

describe("Auction contract", () => {
  it("should deploy correctly", async () => {
    const Auction = await ethers.getContractFactory("Auction");
    const auction = await Auction.deploy();

    expect(await auction.owner()).to.equal(
      "0xc783df8a850f42e7F7e57013759C285caa701eB6"
    );
  });

  // TODO test bidding with value too low fails
  it("should allow bid submission", async () => {
    const Auction = await ethers.getContractFactory("Auction");
    const auction = await Auction.deploy();

    const [firstAccount] = await ethers.getSigners();
    let contractWithSigner = auction.connect(firstAccount);

    await contractWithSigner.bid("3", {
      value: ethers.utils.parseEther("1.0"),
    });

    const contractBalance = await ethers.provider.getBalance(auction.address);
    expect(ethers.utils.formatEther(contractBalance)).to.equal("1.0");
  });

  it.only("should complete auction", async () => {
    const Auction = await ethers.getContractFactory("Auction");
    const auction = await Auction.deploy();

    const [firstAccount] = await ethers.getSigners();
    let contractWithSigner = auction.connect(firstAccount);

    await contractWithSigner.bid("3", {
      value: ethers.utils.parseEther("1.0"),
    });
    await contractWithSigner.bid("3", {
      value: ethers.utils.parseEther("1.0"),
    });
    await contractWithSigner.bid("5", {
      value: ethers.utils.parseEther("1.0"),
    });
    await contractWithSigner.bid("7", {
      value: ethers.utils.parseEther("1.0"),
    });
    await contractWithSigner.bid("9", {
      value: ethers.utils.parseEther("1.0"),
    });

    expect(
      ethers.utils.formatEther(
        await ethers.provider.getBalance(auction.address)
      )
    ).to.equal("5.0");

    // TODO get winning bid & verify it's '5'
    await contractWithSigner.completeAuction();

    expect(
      ethers.utils.formatEther(
        await ethers.provider.getBalance(auction.address)
      )
    ).to.equal("0.0");
  });
});
