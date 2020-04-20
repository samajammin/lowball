import React from "react";
import logo from "./ethereumLogo.png";
import { addresses, abis } from "@project/contracts";
import { gql } from "apollo-boost";
import { ethers } from "ethers";
import { useQuery } from "@apollo/react-hooks";
import "./App.css";

const GET_TRANSFERS = gql`
  {
    transfers(first: 10) {
      id
      from
      to
      value
    }
  }
`;

async function readOnchainBalance() {
  // Should replace with the end-user wallet, e.g. Metamask
  const provider = await new ethers.providers.Web3Provider(
    window.web3.currentProvider
  );
  console.log(provider);
  // Create an instance of ethers.Contract
  // Read more about ethers.js on https://docs.ethers.io/ethers.js/html/api-contract.html
  const ceaErc20 = new ethers.Contract(
    addresses.ceaErc20,
    abis.erc20,
    provider
  );
  // A pre-defined address that owns some CEAERC20 tokens
  const tokenBalance = await ceaErc20.balanceOf(
    "0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C"
  );
  console.log({ tokenBalance: tokenBalance.toString() });
}

function App() {
  const { loading, error, data } = useQuery(GET_TRANSFERS);

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, error, data]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="react-logo" />
        <p>
          Edit <code>packages/react-app/src/App.js</code> and save to reload.
        </p>
        <button onClick={() => readOnchainBalance()}>
          Read On-Chain Balance
        </button>
        <a
          className="App-link"
          href="https://thegraph.com/docs/quick-start"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn The Graph
        </a>
      </header>
    </div>
  );
}

export default App;
