// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IWeave {
    function setUsername(string memory _nickname) external;

    function getUsername(address userAddress) external view returns (string memory);

    function isUserOnboarded(address userAddress) external view returns (bool);

    function getUsersDetails() external view returns (address[] memory, string[] memory);

    function getLeaderboardAddress() external view returns (address);

    function setLeaderboardAddress(address _leaderboardAddress) external;
}
