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
        string userNickname;
        uint256 points;
        uint256 eventsAttended;
    }

    mapping(address => User) public users;
    address[] public userAddresses;

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
        if (users[_userAddress].points == 0) {
            userAddresses.push(_userAddress);
        }

        users[_userAddress].points += POINTS_PER_EVENT;
        users[_userAddress].eventsAttended += 1;
        users[_userAddress].userNickname = _nickName;

        emit UpdateLeaderboard(_userAddress, POINTS_PER_EVENT);
    }

    function getLeaderboard() external view returns (address[] memory, string[] memory, uint256[] memory) {
        return (userAddresses, nicksToArray(), pointsToArray());
    }

    function nicksToArray() internal view returns (string[] memory) {
        string[] memory result = new string[](userAddresses.length);
        for (uint256 i = 0; i < userAddresses.length; i++) {
            result[i] = users[userAddresses[i]].userNickname;
        }
        return result;
    }

    function pointsToArray() internal view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](userAddresses.length);
        for (uint256 i = 0; i < userAddresses.length; i++) {
            result[i] = users[userAddresses[i]].points;
        }
        return result;
    }

    function claimRewards() external nonReentrant {
        require(users[msg.sender].points > 0, "User has no points");
        uint256 points = users[msg.sender].points;

        vault.exchangePointsForGHO(msg.sender, points);
        users[msg.sender].points = 0;

        emit ClaimRewards(msg.sender, points);
    }

    function getEventsAttended(address _userAddress) external view returns (uint256) {
        return users[_userAddress].eventsAttended;
    }

    function getPoints(address _userAddress) external view returns (uint256) {
        return users[_userAddress].points;
    }

    function setEventsFactoryAddress(address _eventsFactoryAddress) external onlyOwner {
        eventsFactory = IEventsFactory(_eventsFactoryAddress);
    }

    function setVaultAddress(address _vaultAddress) external onlyOwner {
        vaultContractAddress = _vaultAddress;
        vault = IVault(_vaultAddress);
    }

    function setWeaveAddress(address _weaveAddress) external onlyOwner {
        weaveContractAddress = _weaveAddress;
        weave = IWeave(_weaveAddress);
    }

    function getUserNickname(address _userAddress) external view returns (string memory) {
        return users[_userAddress].userNickname;
    }

    function getUserPoints(address _userAddress) external view returns (uint256) {
        return users[_userAddress].points;
    }

    function getUserEventsAttended(address _userAddress) external view returns (uint256) {
        return users[_userAddress].eventsAttended;
    }

    function getUserAddresses() external view returns (address[] memory) {
        return userAddresses;
    }
}
