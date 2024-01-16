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
    mapping(address => bool) public addressRegistered;

    function registerUser(string memory nickname) external {
        require(addressRegistered[msg.sender] == true , "Already Regsitered" );
        users[msg.sender] = User(msg.sender , nickname, new address[](0),  new address[](0), 0);
        addressRegistered[msg.sender] = true;
    }


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


    // Function to add an event to listOfEventsParticipated
    function addEventParticipated(address userAddress, address eventAddress) external  {
        require(addressRegistered[userAddress], "User not registered");
        users[userAddress].listOfEventsParticipated.push(eventAddress);
    }

    // Function to add an event to listOfEventsAttended
    function addEventAttended(address userAddress, address eventAddress) external  {
        require(addressRegistered[userAddress], "User not registered");
        users[userAddress].listofEventsAttended.push(eventAddress);
    }

     // Function to update user points
    function updatePoints(address userAddress, uint256 points) external  {
        require(addressRegistered[userAddress], "User not registered");
        users[userAddress].points += points;
    }

}
