import { ethers } from "@nomiclabs/buidler";
import fs from "fs";

async function main() {
  const factory = await ethers.getContract("Greeter");

  // If we had constructor arguments, they would be passed into deploy()
  let contract = await factory.deploy("My custom greeting");

  // The address the Contract WILL have once mined
  console.log("Contract address: ", contract.address);

  // The transaction that was sent to the network to deploy the Contract
  console.log(contract.deployTransaction.hash);

  // The contract is NOT deployed yet; we must wait until it is mined
  await contract.deployed();

  // Save the address to access it from the frontend
  fs.writeFileSync(
    __dirname + "/../app/packages/react-app/src/contract-address.json",
    JSON.stringify({ Greeter: contract.address }, undefined, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
