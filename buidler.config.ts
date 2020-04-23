import { usePlugin, task } from "@nomiclabs/buidler/config";

usePlugin("@nomiclabs/buidler-waffle");

task("accounts", "Prints the list of accounts", async (_, { ethers }) => {
  const accounts = await ethers.provider.listAccounts();
  console.log(accounts);
});

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs, { ethers }) => {
    const balance = await ethers.provider.getBalance(taskArgs.account);
    console.log(ethers.utils.formatEther(balance));
  });

// TODO: Replace this Project ID
// To learn how to get one go to http://bit.ly/infura-project-id
const INFURA_PROJECT_ID = "2c499aed715a47f5bb77ef88afc5f27d";

// TODO: Replace this private key
// This is the private key associated with the account that will be used to
// deploy your contract to mainnet and the testing networks.
const REMOTE_NETWORKS_ACCOUNT_PRIVATE_KEY =
  "0xc5e8f61d1ab959b397eecc0a37a6517b8e67a0e7cf1f4bce5591f3ed80199122";

module.exports = {
  solc: {
    version: "0.5.15",
  },
  networks: {
    buidlerevm: {
      loggingEnabled: true,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [REMOTE_NETWORKS_ACCOUNT_PRIVATE_KEY],
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [REMOTE_NETWORKS_ACCOUNT_PRIVATE_KEY],
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [REMOTE_NETWORKS_ACCOUNT_PRIVATE_KEY],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [REMOTE_NETWORKS_ACCOUNT_PRIVATE_KEY],
    },
    gorli: {
      url: `https://gorli.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [REMOTE_NETWORKS_ACCOUNT_PRIVATE_KEY],
    },
  },
};
