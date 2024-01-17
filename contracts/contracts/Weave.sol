// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "../interfaces/IVault.sol";

contract Users {


    IVault public vaultContract;
    address public rewardToken;  // Address of the token used as a reward


    event RewardsClaimed(address indexed user, uint256 points, uint256 tokenAmount);

    // Reentrancy guard state variable
    bool private locked;

    // Constructor to set initial vault contract and reward token
    constructor(address _vaultAddress, address _rewardToken) {
        vaultContract = IVault(_vaultAddress);
        rewardToken = _rewardToken;
        locked = false;
    }

    modifier noReentrancy() {
        require(!locked, "No reentrancy");
        locked = true;
        _;
        locked = false;
    }

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


    // most Important
    function claimRewards() public {
        require(addressRegistered[msg.sender], "User not registered");
        uint256 rewardPoints = users[msg.sender].points;

        // Add logic to handle the reward claim, like transferring tokens

        // Reset points after claiming
        users[msg.sender].points = 0;
    }

    function participatedInEvent(address userAddress, address eventAddress) public view returns (bool) {
        require(addressRegistered[userAddress], "User not registered");
        for (uint i = 0; i < users[userAddress].listOfEventsParticipated.length; i++) {
            if (users[userAddress].listOfEventsParticipated[i] == eventAddress) {
                return true;
            }
        }
        return false;
    }   

    function claimRewards(address eventAddress) public noReentrancy {
        require(addressRegistered[msg.sender], "User not registered");
        require(users[msg.sender].points > 0, "No reward points");

        uint256 tokenAmount = vaultContract.getPoolAmount(eventAddress);  // Get the token amount from the pool for the event

        // Check if the pool has enough tokens to cover the reward
        require(tokenAmount > 0, "Insufficient tokens in the pool");

        // Reset points before transferring to prevent reentrancy issues
        uint256 claimedPoints = users[msg.sender].points;
        users[msg.sender].points = 0;

        // Withdraw tokens from the pool for the event
        vaultContract.withdrawFromPool(rewardToken, eventAddress);

        // Transfer tokens to the user
        IERC20(rewardToken).transfer(msg.sender, tokenAmount);

        emit RewardsClaimed(msg.sender, claimedPoints, tokenAmount);
    }
}



}
