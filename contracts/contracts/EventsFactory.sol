// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Event.sol";
import "./interfaces/IEventsFactory.sol";
import "./interfaces/IVault.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EventFactory is Ownable {
    event EventCreated(address indexed eventAddress);

    address[] public allEvents;
    address public vaultContractAddress;
    address public weaveContractAddress;
    address public leaderboardContractAddress;

    uint256 price = 0.001 ether;

    constructor(address _vaultAddress) Ownable(msg.sender) {
        vaultContractAddress = _vaultAddress;
    }

    function createEvent(
        string memory _eventName,
        string memory _eventDescription,
        int256 _latitude,
        int256 _longitude,
        address[] memory _eventManagers,
        uint256 _eventRadius,
        string memory _eventRadiusColor,
        IERC20 _eventToken,
        uint256 _amount
    ) external {
        require(_eventRadius > 0, "Radius must be greater than 0");
        require(_eventManagers.length <= 5, "Max 5 managers");

        Event newEvent = new Event(
            _eventName,
            _eventDescription,
            _latitude,
            _longitude,
            _eventManagers,
            _eventRadius,
            _eventRadiusColor,
            weaveContractAddress,
            leaderboardContractAddress
            );

        allEvents.push(address(newEvent));
        _eventToken.transferFrom(msg.sender, vaultContractAddress, _amount);
        emit EventCreated(address(newEvent));
    }

    function createEventWithNativeTokens(
        string memory _eventName,
        string memory _eventDescription,
        int256 _latitude,
        int256 _longitude,
        address[] memory _eventManagers,
        uint256 _eventRadius,
        string memory _eventRadiusColor
    ) external payable {
        require(_eventRadius > 0, "Radius must be greater than 0");
        require(_eventManagers.length <= 5, "Max 5 managers");

        require(msg.value >= price, "Insufficient ETH sent");

        Event newEvent = new Event(
            _eventName,
            _eventDescription,
            _latitude,
            _longitude,
            _eventManagers,
            _eventRadius,
            _eventRadiusColor,
            weaveContractAddress,
            leaderboardContractAddress
        );

        allEvents.push(address(newEvent));
        payable(vaultContractAddress).transfer(msg.value);
        emit EventCreated(address(newEvent));
    }

    function isUserHasAlreadyCreatedEvent(address _user) external view returns (bool) {
        for (uint256 i = 0; i < allEvents.length; i++) {
            if (allEvents[i] == _user) return true;
        }
        return false;
    }

    function isContractAnEvent(address _eventAddress) external view returns (bool) {
        for (uint256 i = 0; i < allEvents.length; i++) {
            if (allEvents[i] == _eventAddress) return true;
        }
        return false;
    }

    function getAllEvents() external view returns (address[] memory) {
        return allEvents;
    }

    function calculatingPriceToCreate(uint256 _eventStartDate, uint256 _eventEndDate, uint256 _eventRadius) internal pure returns (uint256) {
        return ((_eventEndDate - _eventStartDate) / 86400 * 100) + (_eventRadius / 100);
    }

    function setVaultAddress(address _vaultAddress) external onlyOwner {
        vaultContractAddress = _vaultAddress;
    }
}
