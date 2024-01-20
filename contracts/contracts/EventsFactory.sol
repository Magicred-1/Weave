// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Event.sol";
import "./interfaces/IEventsFactory.sol";
import "./interfaces/ILeaderboard.sol";
import "./interfaces/IVault.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EventFactory is Ownable {
    event EventCreated(address indexed eventAddress);

    address[] public allEvents;

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

    function getAllEventsDetails() external view returns (address[] memory, string[] memory, string[] memory, uint256[] memory, uint256[] memory, uint256[] memory, address[] memory) {
        string[] memory eventNames = new string[](allEvents.length);
        string[] memory eventDescriptions = new string[](allEvents.length);
        address[] memory eventOwners = new address[](allEvents.length);
        uint256[] memory eventStartDates = new uint256[](allEvents.length);
        address[] memory eventManagers = new address[](allEvents.length);
        uint256[] memory eventEndDates = new uint256[](allEvents.length);
        uint256[] memory eventRadiuses = new uint256[](allEvents.length);

        for (uint256 i = 0; i < allEvents.length; i++) {
            Event eventContract = Event(allEvents[i]);
            eventNames[i] = eventContract.eventName();
            eventDescriptions[i] = eventContract.eventDescription();
            eventOwners[i] = eventContract.owner();
            eventStartDates[i] = eventContract.eventStartingDate();
            eventManagers[i] = eventContract.eventManagers(i);
            eventEndDates[i] = eventContract.eventEndDate();
            eventRadiuses[i] = eventContract.eventRadius();
        }

        return (allEvents, eventNames, eventDescriptions, eventStartDates, eventEndDates, eventRadiuses, eventManagers);
    }

    function getEventsCreatedByUserDetails(address _user) external view returns (address[] memory) {
        address[] memory eventsCreatedByUser = new address[](allEvents.length);
        uint256 eventsCreatedByUserCount = 0;

        for (uint256 i = 0; i < allEvents.length; i++) {
            Event eventContract = Event(allEvents[i]);
            if (eventContract.owner() == _user) {
                eventsCreatedByUser[eventsCreatedByUserCount] = allEvents[i];
                eventsCreatedByUserCount++;
            }
        }

        return eventsCreatedByUser;
    }

    // function calculatingPriceToCreate(uint256 _eventStartDate, uint256 _eventEndDate, uint256 _eventRadius) internal pure returns (uint256) {
    //     return ((_eventEndDate - _eventStartDate) / 86400 * 100) + (_eventRadius / 100);
    // }

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
