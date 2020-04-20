import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";

// Created check function to see if the MetaMask extension is installed
const isMetaMaskInstalled = () => {
  // Have to check the ethereum binding on the window object to see if it's installed
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

const App = () => {
  const [appState, setAppState] = useState({
    address: "0x06DbFdbFdA84eABAea177760092Dc22ab1D8f372", // TODO
    balance: "",
    provider: {},
  });

  useEffect(() => {
    const initialize = async () => {
      const provider = await new ethers.providers.Web3Provider(
        window.web3.currentProvider
      );

      // TODO is this specific to MetaMask?
      // Should add check for MetaMask
      // https://docs.metamask.io/guide/create-dapp.html
      const { ethereum } = window;
      await ethereum.enable();

      const address = appState.address;
      let balance = await provider.getBalance(address);
      balance = ethers.utils.formatEther(balance);

      setAppState({ balance, provider, address });
    };
    initialize();
  }, [appState.address]);

  return (
    <div className="App">
      <section>
        <h1>HEY THERE</h1>
        {!isMetaMaskInstalled() && (
          <h1>You need to install MetaMask to use this app.</h1>
        )}
        <h3>User balance:</h3>
        {appState.balance}
      </section>
    </div>
  );
};

export default App;
