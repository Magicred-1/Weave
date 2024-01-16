// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ILeaderboard.sol";

interface IUsers {
    struct User {
        string nickName;
        address userAddress;
    }

    event UserRegistered(address indexed userAddress, string nickName);
    event RankUpdated(address indexed userAddress, uint256 rank);
    event PointsUpdated(address indexed userAddress, uint256 points);
    event EventAttended(address indexed userAddress, address indexed eventAddress);

    function registerUser(address _user, string memory _nickName) external;

    function isRegistered(address _user) external view returns (bool);

    function getNickName(address _user) external view returns (string memory);

    // We get the rank from the leaderboard contract
    function getRank(address _user) external view returns (uint256);

    // We get the list of events attended from the leaderboard contract
    function getListofEventsAttended(address _user) external view returns (address[] memory);

    // We get the points from the leaderboard contract
    function getPoints(address _user) external view returns (uint256);
}

// IUsers.sol