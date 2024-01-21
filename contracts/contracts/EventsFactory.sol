// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Event.sol";
import "./interfaces/IWeave.sol";
import "./interfaces/IEventsFactory.sol";
import "./interfaces/ILeaderboard.sol";
import "./interfaces/IVault.sol";
import "./interfaces/IEvent.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EventFactory is Ownable {
    event EventCreated(address indexed eventAddress);

    address[] public allEvents;

    struct EventDetails {
        string eventName;
        string eventDescription;
        uint256 eventStartDate;
        uint256 eventEndDate;
        int256 latitude;
        int256 longitude;
        address[] eventManagers;
        uint256 eventRadius;
        string eventRadiusColor;
    }

    mapping(address => EventDetails) public eventDetails;

    IVault public vaultContractAddress;
    IWeave public weaveContractAddress;
    ILeaderboard public leaderboardContractAddress;

    constructor(
        address _vaultAddress,
        address _weaveAddress,
        address _leaderboardAddress
    ) Ownable(msg.sender) {
        vaultContractAddress = IVault(_vaultAddress);
        weaveContractAddress = IWeave(_weaveAddress);
        leaderboardContractAddress = ILeaderboard(_leaderboardAddress);
    }

    function createEvent(
        string memory _eventName,
        string memory _eventDescription,
        uint256 _eventStartDate,
        uint256 _eventEndDate,
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
        require(_eventToken.allowance(msg.sender, address(this)) >= _amount, "Not enough allowance");
        require(_eventToken.balanceOf(msg.sender) >= _amount, "Not enough balance");

        // Deploy the Event contract
        Event newEvent = new Event(
            _eventName,
            _eventDescription,
            _eventStartDate,
            _eventEndDate,
            _latitude,
            _longitude,
            _eventManagers,
            _eventRadius,
            _eventRadiusColor,
            address(weaveContractAddress),
            address(leaderboardContractAddress)
        );

        allEvents.push(address(newEvent));

        // Transfer tokens to vault
        _eventToken.transferFrom(msg.sender, address(vaultContractAddress), _amount);

        eventDetails[address(newEvent)] = EventDetails(
            _eventName,
            _eventDescription,
            _eventStartDate,
            _eventEndDate,
            _latitude,
            _longitude,
            _eventManagers,
            _eventRadius,
            _eventRadiusColor
        );

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


    // Use the IEvent interface to call the functions of the Event contract
    function getAllEventsDetails() external view returns (
        string[] memory,
        string[] memory,
        uint256[] memory,
        uint256[] memory,
        int256[] memory,
        int256[] memory,
        uint256[] memory,
        string[] memory
    ) {
        string[] memory eventNames = new string[](allEvents.length);
        string[] memory eventDescriptions = new string[](allEvents.length);
        uint256[] memory eventStartDates = new uint256[](allEvents.length);
        uint256[] memory eventEndDates = new uint256[](allEvents.length);
        int256[] memory latitudes = new int256[](allEvents.length);
        int256[] memory longitudes = new int256[](allEvents.length);
        uint256[] memory eventRadiuses = new uint256[](allEvents.length);
        string[] memory eventRadiusColors = new string[](allEvents.length);

        for (uint256 i = 0; i < allEvents.length; i++) {
            eventNames[i] = IEvent(allEvents[i]).getEventName();
            eventDescriptions[i] = IEvent(allEvents[i]).getEventDescription();
            eventStartDates[i] = IEvent(allEvents[i]).getEventStartingDate();
            eventEndDates[i] = IEvent(allEvents[i]).getEventEndDate();
            latitudes[i] = IEvent(allEvents[i]).getLatitude();
            longitudes[i] = IEvent(allEvents[i]).getLongitude();
            eventRadiuses[i] = IEvent(allEvents[i]).getEventRadius();
            eventRadiusColors[i] = IEvent(allEvents[i]).getEventRadiusColor();
        }

        return (
            eventNames,
            eventDescriptions,
            eventStartDates,
            eventEndDates,
            latitudes,
            longitudes,
            eventRadiuses,
            eventRadiusColors
        );
    }

    function getEventManagers(address _eventAddress) external view returns (address[] memory) {
        return IEvent(_eventAddress).getManagers();
    }

    function calculatingPriceToCreate(uint256 _eventStartDate, uint256 _eventEndDate, uint256 _eventRadius) internal pure returns (uint256) {
        return ((_eventEndDate - _eventStartDate) / 86400 * 100) + (_eventRadius / 100);
    }

    function setVaultAddress(address _vaultAddress) external onlyOwner {
        vaultContractAddress = IVault(_vaultAddress);
    }

    function setWeaveAddress(address _weaveAddress) external onlyOwner {
        weaveContractAddress = IWeave(_weaveAddress);
    }

    function setLeaderboardAddress(address _leaderboardAddress) external onlyOwner {
        leaderboardContractAddress = ILeaderboard(_leaderboardAddress);
    }
}
