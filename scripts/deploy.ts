import { ethers } from "@nomiclabs/buidler"
import { readArtifact } from "@nomiclabs/buidler/plugins"
import fs from "fs"

async function main() {
  const factory = await ethers.getContract("Greeter")

  // If we had constructor arguments, they would be passed into deploy()
  let contract = await factory.deploy("My custom greeting")

  // The address the Contract WILL have once mined
  console.log("Contract address: ", contract.address)

  // The transaction that was sent to the network to deploy the Contract
  console.log(contract.deployTransaction.hash)

  // The contract is NOT deployed yet; we must wait until it is mined
  await contract.deployed()

  // TODO use relative path
  const artifact = await readArtifact(
    "/Users/samrichards/code/lowball/artifacts/", // TODO update
    "Greeter"
  )

  // Save the address & abi to access it from the frontend
  fs.writeFileSync(
    __dirname + "/../app/packages/react-app/src/artifacts.json",
    JSON.stringify(
      { Greeter: { address: contract.address, abi: artifact.abi } },
      undefined,
      2
    )
  )
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error)
    process.exit(1)
  })
