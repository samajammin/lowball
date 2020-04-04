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
        address bidder;
    }
    Bid[] bids;

    address public owner;
    uint public bidCost = 1000000000000000000;
    uint public maxBids = 10;
    uint public bidCount = 0;

    constructor() public {
        console.log("Deploying an Auction");
        owner = msg.sender;
    }

    function bid(uint _bid) public payable {
        require(bidCount < maxBids, "Auction is closed.");
        require(msg.value >= bidCost, "You must send at least 1 ETH.");

        console.log("Submitting a bid: ", _bid);
        console.log("Bid value: ", msg.value);
        bids.push(Bid({
           bid: _bid,
           bidder: msg.sender 
        }));
        bidCount++;
    }

    // TODO only owner
    // function closeAuction() public {
    //     require(bidCount == maxBids, "Auction is still in progress.");
        
    //     // Calculate lowest unique bid
    //     // TODO actually check for uniqueness
    //     uint winningBidIndex = 0;
    //     for (uint i = 0; i < bids.length; i++) {
    //         if (bids[i].bid < bids[winningBidIndex].bid) {
    //             winningBidIndex = i;
    //         }
    //     }

    //     console.log("balance: ", address(this).balance);

    //     // Send funds to winner
    //     bids[winningBidIndex].bidder.transfer(address(this).balance);
    // }
}