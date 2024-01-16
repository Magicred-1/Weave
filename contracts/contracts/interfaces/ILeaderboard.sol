// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IUsers.sol";

interface ILeaderboard {
    struct Leaderboard {
        address[] users;
        uint256[] points;
    }

    event LeaderboardUpdated(address indexed user, uint256 points);

    function updateLeaderboard(address _user, uint256 _points) external;

    function getLeaderboard() external view returns (address[] memory, uint256[] memory);

    function getLeaderboardLength() external view returns (uint256);

    function getUserRank(address _user) external view returns (uint256);
}

// ILeaderboard.sol