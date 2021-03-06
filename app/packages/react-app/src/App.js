import React from "react"
import { ethers } from "ethers"
import "./App.css"
import artifacts from "./artifacts.json"

// Created check function to see if the MetaMask extension is installed
const isMetaMaskInstalled = () => {
  // Have to check the ethereum binding on the window object to see if it's installed
  const { ethereum } = window
  return Boolean(ethereum && ethereum.isMetaMask)
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: "",
      greeting: "",
      newGreeting: "",
      balance: "",
      provider: {},
    }
  }

  async componentDidMount() {
    if (window.web3 === undefined) {
      return
    }

    const provider = await new ethers.providers.Web3Provider(
      window.web3.currentProvider
    )

    // TODO is this specific to MetaMask?
    // Should add check for MetaMask
    // https://docs.metamask.io/guide/create-dapp.html
    const { ethereum } = window
    await ethereum.enable()

    // TODO is this right?
    // Currently using this generated address via Buidler EVM
    // 0xc783df8a850f42e7f7e57013759c285caa701eb6
    const address = ethereum.selectedAddress
    let balance = await provider.getBalance(address)
    balance = ethers.utils.formatEther(balance)

    // connect the contract with a signer, which allows update methods
    // vs. connecting via a Provider, which provides read-only access
    const contract = new ethers.Contract(
      artifacts.Greeter.address,
      artifacts.Greeter.abi,
      provider.getSigner()
    )

    const greeting = await contract.greet()

    this.setState({
      address,
      balance,
      provider,
      greeting,
      contract,
    })
  }

  async updateGreeting() {
    const tx = await this.state.contract.setGreeting(this.state.newGreeting)

    // Wait until tx is mined
    await tx.wait()

    const greeting = await this.state.contract.greet()
    this.setState({ ...this.state, greeting })
  }

  handleInputChange = event => {
    this.setState({ ...this.state, newGreeting: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.updateGreeting()
  }

  render() {
    if (!isMetaMaskInstalled()) {
      return (
        <div className="App">
          <section>
            <h1>Hey there!</h1>
            <h1>
              You need to{" "}
              <a
                href="https://metamask.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                install MetaMask
              </a>{" "}
              to use this app.
            </h1>
          </section>
        </div>
      )
    }
    return (
      <div className="App">
        <section>
          <h1>Welcome to Honeypot!</h1>
          <h3>User address:</h3>
          {this.state.address}
          <h3>User balance:</h3>
          {this.state.balance}
          <h3>Contract greeting:</h3>
          {this.state.greeting}
          <h3>Set greeting:</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.newGreeting}
              onChange={this.handleInputChange}
              placeholder="New greeting..."
            ></input>

            <button>Set</button>
          </form>
        </section>
      </div>
    )
  }
}

export default App
