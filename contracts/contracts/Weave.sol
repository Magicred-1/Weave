// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Weave {
    struct User {
        string nickname;
    }

    mapping(address => User) public users;

    address[] public userAddresses;
    address public leaderboardContractAddress;

    modifier onlyLeaderboard() {
        require(msg.sender == leaderboardContractAddress, "Only leaderboard can call this function");
        _;
    }

    constructor(address _leaderboardAddress) {
        leaderboardContractAddress = _leaderboardAddress;
    }

    function setUsername(string memory _nickname) external {
        require(bytes(users[msg.sender].nickname).length == 0, "User already registered");
        users[msg.sender].nickname = _nickname;
        userAddresses.push(msg.sender);
    }

    function getUsername(address userAddress) external view returns (string memory) {
        require(bytes(users[userAddress].nickname).length > 0, "User not registered");
        return users[userAddress].nickname;
    }

    function isUserOnboarded(address userAddress) external view returns (bool) {
        return bytes(users[userAddress].nickname).length > 0;
    }

    function getUsersDetails() external view returns (address[] memory, string[] memory) {
        string[] memory nicknames = new string[](userAddresses.length);
        for (uint256 i = 0; i < userAddresses.length; i++) {
            nicknames[i] = users[userAddresses[i]].nickname;
        }
        return (userAddresses, nicknames);
    }

    function getLeaderboardAddress() external view returns (address) {
        return leaderboardContractAddress;
    }

    function setLeaderboardAddress(address _leaderboardAddress) external onlyLeaderboard {
        leaderboardContractAddress = _leaderboardAddress;
    }
}
