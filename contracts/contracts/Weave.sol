// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Users {
    struct User {
        address userAddress;
        string nickName;
        address[] listOfEventsParticipated;
        address[] listofEventsAttended;
        uint256 points;
    }

    mapping(address => User) public users;

     // Function to set a user's nickname
    function setUsername(address userAddress, string memory newNickname) external {
        require(addressRegistered[userAddress], "User not registered");
        require(msg.sender == userAddress, "Only the user can set their nickname");

        users[userAddress].nickName = newNickname;
    }

    // Function to get a user's nickname
    function getUsername(address userAddress) external view returns (string memory) {
        require(addressRegistered[userAddress], "User not registered");

        return users[userAddress].nickName;
    }  

    // Need to be added to the event contract
    // // Function to add an event to listOfEventsParticipated
    // function addEventParticipated(address userAddress, address eventAddress) external  {
    //     require(addressRegistered[userAddress], "User not registered");
    //     users[userAddress].listOfEventsParticipated.push(eventAddress);
    // }

    // // Function to add an event to listOfEventsAttended
    // function addEventAttended(address userAddress, address eventAddress) external  {
    //     require(addressRegistered[userAddress], "User not registered");
    //     users[userAddress].listofEventsAttended.push(eventAddress);
    // }

    //  // Function to update user points
    // function updatePoints(address userAddress, uint256 points) external  {
    //     require(addressRegistered[userAddress], "User not registered");
    //     users[userAddress].points += points;
    // }


    // // most Important
    // function claimRewards() public {
    //     require(addressRegistered[msg.sender], "User not registered");
    //     uint256 rewardPoints = users[msg.sender].points;

    //     // Add logic to handle the reward claim, like transferring tokens

    //     // Reset points after claiming
    //     users[msg.sender].points = 0;
    // }

    // function participatedInEvent(address userAddress, address eventAddress) public view returns (bool) {
    //     require(addressRegistered[userAddress], "User not registered");
    //     for (uint i = 0; i < users[userAddress].listOfEventsParticipated.length; i++) {
    //         if (users[userAddress].listOfEventsParticipated[i] == eventAddress) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }   



}
