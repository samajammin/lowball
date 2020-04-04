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

module.exports = {};
