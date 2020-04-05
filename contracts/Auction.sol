pragma solidity ^0.5.1;

import "@nomiclabs/buidler/console.sol";

/*
    Lowest unique bid auction

    v1.0 Requirements
    - Owner / adimin
        - Do they initiate new games? Or should contract do that automatically?
        - Can set cost of submitting a bid?

    - Auction
        - Can calculate count of bids
        - Can calculate if a bid is unique
        - When count of bids == size of auction
            - Calculate winner & pay out prize
            - Reset to new auction

        Questions
        Should this be a factory contract that deploys a new auction contract for every auction?

    - Bidder
        - Can submit bids

    
    Implementation questions

    Best data structure?

*/

contract Auction {

    struct Bid {
        uint bid;
        address payable bidder;
    }
    Bid[] bids;

    address public owner;
    uint public bidCost = 1000000000000000000;
    uint public maxBids = 5;

    constructor() public {
        console.log("Deploying an Auction");
        owner = msg.sender;
    }

    function bid(uint _bid) public payable {
        require(bids.length < maxBids, "Auction is closed.");
        require(msg.value >= bidCost, "You must send at least 1 ETH.");

        console.log("Submitting a bid: ", _bid);
        console.log("Bid value: ", msg.value);
        bids.push(Bid({
           bid: _bid,
           bidder: msg.sender 
        }));
    }

    function getWinner() public view returns (uint bidIndex) {
        require(bids.length == maxBids, "Auction is still in progress.");

        for (uint i = 0; i < bids.length; i++) {
            uint currentValue = bids[i].bid;
            bool isWinner = true;

            for (uint j = 0; j < bids.length; j++) {
                // don't compare to self
                if (i == j) {
                    continue;
                }

                uint compValue = bids[j].bid;

                // is duplicate
                if (currentValue == compValue) {
                    isWinner = false;
                    break;
                }

                if (currentValue > compValue) {
                    isWinner = false;
                    // isWinner = false UNLESS compValue is a duplicate
                    for (uint k = 0; k < bids.length; k++) {
                        // compValue is duplicate
                        if (compValue == bids[k].bid && j != k) {
                            isWinner = true;
                        }
                    }
                }

                if (!isWinner) {
                    break;
                }
            }

            if (isWinner) {
                return i;
            }
        }

        return 2^256-1; // Max uint
    }

    function completeAuction() public {
        uint winningIndex = getWinner();
        address payable winner = bids[winningIndex].bidder;
        console.log("completeAuction! winner: ", winner);
        console.log("completeAuction! winning bid: ", bids[winningIndex].bid);
        winner.transfer(address(this).balance);
    }
}