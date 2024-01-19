// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IWeave.sol";
import "./interfaces/IVault.sol";
import "./interfaces/IEventsFactory.sol";

contract Leaderboard is ReentrancyGuard, Ownable {
    IWeave public weave;
    IVault public vault;
    IEventsFactory public eventsFactory;

    address public weaveContractAddress;
    address public vaultContractAddress;

    uint256 constant POINTS_PER_EVENT = 100;

    struct User {
        string nickName;
        uint256 points;
        uint256 eventsAttended;
    }

    struct LeaderboardEntry {
        mapping(address => User) users;
        address[] userAddresses;
    }

    LeaderboardEntry public leaderboard;

    modifier onlyEvent() {
        require(eventsFactory.isContractAnEvent(msg.sender), "Only event can call this function");
        _;
    }

    event UpdateLeaderboard(address indexed userAddress, uint256 points);
    event ClaimRewards(address indexed userAddress, uint256 points);

    constructor(
        address _weaveAddress,
        address _vaultAddress
    ) Ownable(msg.sender) {
        weaveContractAddress = _weaveAddress;
        vaultContractAddress = _vaultAddress;
        weave = IWeave(_weaveAddress);
        vault = IVault(_vaultAddress);
    }

    function updateLeaderboard(address _userAddress, string memory _nickName) external onlyEvent {
        if (leaderboard.users[_userAddress].points == 0) {
            leaderboard.userAddresses.push(_userAddress);
        }

        leaderboard.users[_userAddress].points += POINTS_PER_EVENT;
        leaderboard.users[_userAddress].eventsAttended += 1;
        leaderboard.users[_userAddress].nickName = _nickName;

        emit UpdateLeaderboard(_userAddress, POINTS_PER_EVENT);
    }

    function getLeaderboard() external view returns (address[] memory, string[] memory, uint256[] memory) {
        return (leaderboard.userAddresses, nicksToArray(), pointsToArray());
    }

    function nicksToArray() internal view returns (string[] memory) {
        string[] memory result = new string[](leaderboard.userAddresses.length);
        for (uint256 i = 0; i < leaderboard.userAddresses.length; i++) {
            result[i] = leaderboard.users[leaderboard.userAddresses[i]].nickName;
        }
        return result;
    }

    function pointsToArray() internal view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](leaderboard.userAddresses.length);
        for (uint256 i = 0; i < leaderboard.userAddresses.length; i++) {
            result[i] = leaderboard.users[leaderboard.userAddresses[i]].points;
        }
        return result;
    }

    function claimRewards() external nonReentrant {
        require(leaderboard.users[msg.sender].points > 0, "User has no points");
        uint256 points = leaderboard.users[msg.sender].points;

        vault.exchangePointsForGHO(msg.sender, points);
        leaderboard.users[msg.sender].points = 0;

        emit ClaimRewards(msg.sender, points);
    }

    function getEventsAttended(address _userAddress) external view returns (uint256) {
        return leaderboard.users[_userAddress].eventsAttended;
    }

    function getPoints(address _userAddress) external view returns (uint256) {
        return leaderboard.users[_userAddress].points;
    }
}
