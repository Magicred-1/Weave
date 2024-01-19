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
    address public easContractAddress;

    constructor(address _vaultAddress) Ownable(msg.sender) {
        vaultContractAddress = _vaultAddress;
    }

    // We use ERC20 token as a payment method for creating an event
    function createEvent(
        string memory _eventName,
        string memory _eventDescription,
        uint256 _eventStartDate,
        uint256 _eventEndDate,
        string memory _eventWebsite,
        uint256 _eventMaxParticipants,
        int256 _latitude,
        int256 _longitude,
        address[] memory _eventManagers,
        uint256 _eventRadius,
        string memory _eventRadiusColor,
        IERC20 _eventToken,  // Include ERC20 token as a parameter
        address _weaveContractAddress,
        address _vaultContractAddress,
        address _leaderboardContractAddress
    ) external {
        require(_eventStartDate > block.timestamp, "Event start date must be in the future");
        require(_eventEndDate > _eventStartDate, "Event end date must be after event start date");
        require(_eventRadius > 0, "Event radius must be greater than 0");
        require(_eventManagers.length <= 5, "Event managers must be less than or equal to 5");

        uint256 _price = calculatingPriceToCreate(_eventStartDate, _eventEndDate, _eventRadius);
        require(_eventToken.balanceOf(msg.sender) >= _price, "You don't have enough tokens to create an event");
        /*
                string memory _eventName,
        string memory _eventDescription,
        uint256 _eventStartDate,
        uint256 _eventEndDate,
        string memory _eventWebsite,
        uint256 _eventMaxParticipants,
        int256 _latitude,
        int256 _longitude,
        address[] memory _eventManagers,
        uint256 _eventRadius,
        string memory _eventRadiusColor,
        address _weaveContractAddress,
        address _vaultContractAddress,
        address _leaderboardContractAddress
        */
        Event newEvent = new Event(
            _eventName,
            _eventDescription,
            _eventStartDate,
            _eventEndDate,
            _eventWebsite,
            _eventMaxParticipants,
            _latitude,
            _longitude,
            _eventManagers,
            _eventRadius,
            _eventRadiusColor,
            _weaveContractAddress,
            _vaultContractAddress,
            _leaderboardContractAddress
        );


        allEvents.push(address(newEvent));
        _eventToken.transferFrom(msg.sender, vaultContractAddress, _price); // Transfer tokens to the vault contract
        emit EventCreated(address(newEvent));
    }

    function createEventWithNativeTokens(
        string memory _eventName,
        string memory _eventDescription,
        uint256 _eventStartDate,
        uint256 _eventEndDate,
        string memory _eventWebsite,
        uint256 _eventMaxParticipants,
        int256 _latitude,
        int256 _longitude,
        address[] memory _eventManagers,
        uint256 _eventRadius,
        string memory _eventRadiusColor
    ) external payable {
        require(_eventStartDate > block.timestamp, "Event start date must be in the future");
        require(_eventEndDate > _eventStartDate, "Event end date must be after event start date");
        require(_eventRadius > 0, "Event radius must be greater than 0");
        require(_eventManagers.length <= 5, "Event managers must be less than or equal to 5");

        uint256 price = calculatingPriceToCreate(_eventStartDate, _eventEndDate, _eventRadius);
        require(msg.value >= price, "Insufficient ETH sent to create an event");

        Event newEvent = new Event(
            _eventName,
            _eventDescription,
            _eventStartDate,
            _eventEndDate,
            _eventWebsite,
            _eventMaxParticipants,
            _latitude,
            _longitude,
            _eventManagers,
            _eventRadius,
            _eventRadiusColor,
            weaveContractAddress,
            vaultContractAddress,
            leaderboardContractAddress
        );

        allEvents.push(address(newEvent));
        payable(vaultContractAddress).transfer(msg.value); // Transfer ETH to the vault contract
        emit EventCreated(address(newEvent));
    }

    function isUserHasAlreadyCreatedEvent(address _user) external view returns (bool) {
        for (uint256 i = 0; i < allEvents.length; i++) {
            if (allEvents[i] == _user) {
                return true;
            }
        }
        return false;
    }

    function isContractAnEvent(address _eventAddress) external view returns (bool) {
        for (uint256 i = 0; i < allEvents.length; i++) {
            if (allEvents[i] == _eventAddress) {
                return true;
            }
        }
        return false;
    }

    function getAllEvents() external view returns (address[] memory) {
        return allEvents;
    }

    function calculatingPriceToCreate(uint256 _eventStartDate, uint256 _eventEndDate, uint256 _eventRadius) internal pure returns (uint256) {
        uint256 price = 0;
        uint256 daysBetween = (_eventEndDate - _eventStartDate) / 86400;
        price += daysBetween * 100;
        price += _eventRadius / 100;
        return price;
    }

    function setVaultAddress(address _vaultAddress) external onlyOwner {
        vaultContractAddress = _vaultAddress;
    }
}