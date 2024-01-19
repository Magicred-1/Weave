// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IUsers.sol";

interface ILeaderboard {
    struct Leaderboard {
        address[] users;
        uint256[] points;
    }

    event LeaderboardUpdated(address indexed user, uint256 points);

    function updateLeaderboard(address _userAddress) external;

    function getLeaderboard() external view returns (address[] memory, uint256[] memory);
    
    function claimRewards() external;

    function getEventsAttended(address _userAddress) external view returns (address[] memory);

    function getPoints(address _userAddress) external view returns (uint256);
}

// ILeaderboard.sol