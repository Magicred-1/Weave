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

    // club all the data in one array
    function getAllEventsDetails() external view returns (EventDetails[] memory) {
        EventDetails[] memory allEventDetails = new EventDetails[](allEvents.length);

        for (uint256 i = 0; i < allEvents.length; i++) {
            EventDetails storage details = eventDetails[allEvents[i]];
            allEventDetails[i] = EventDetails({
                eventName: details.eventName,
                eventDescription: details.eventDescription,
                eventStartDate: details.eventStartDate,
                eventEndDate: details.eventEndDate,
                latitude: details.latitude,
                longitude: details.longitude,
                eventManagers: details.eventManagers,
                eventRadius: details.eventRadius,
                eventRadiusColor: details.eventRadiusColor
            });
        }

        return allEventDetails;
    }

    function getEventsCreatedByUserDetails(address _user) external view returns (address[] memory) {
        address[] memory eventsCreatedByUser = new address[](allEvents.length);
        uint256 eventsCreatedByUserCount = 0;

        for (uint256 i = 0; i < allEvents.length; i++) {
            if (IEvent(allEvents[i]).isParticipantOnboarded(_user)) {
                eventsCreatedByUser[eventsCreatedByUserCount] = allEvents[i];
                eventsCreatedByUserCount++;
            }
        }

        return eventsCreatedByUser;
    }

    function getAllEventManagers() external view returns (address[] memory) {
        address[] memory allEventManagers = new address[](allEvents.length * 5);
        uint256 counter = 0;
        for (uint256 i = 0; i < allEvents.length; i++) {
            address[] memory eventManagers = IEvent(allEvents[i]).getManagers();
            for (uint256 j = 0; j < eventManagers.length; j++) {
                allEventManagers[counter] = eventManagers[j];
                counter++;
            }
        }
        return allEventManagers;
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

    // Helper function to convert uint256 to string
    function uint256ToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }

        uint256 temp = value;
        uint256 length;

        while (temp != 0) {
            length++;
            temp /= 10;
        }

        bytes memory result = new bytes(length);
        uint256 index = length;

        while (value != 0) {
            index--;
            result[index] = bytes1(uint8(48 + value % 10));
            value /= 10;
        }

        return string(result);
    }

    // Helper function to convert int256 to string
    function int256ToString(int256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }

        bool isNegative = value < 0;
        uint256 temp = isNegative ? uint256(-value) : uint256(value);
        uint256 length;

        while (temp != 0) {
            length++;
            temp /= 10;
        }

        bytes memory result = new bytes(isNegative ? length + 1 : length);
        uint256 index = length;

        temp = isNegative ? uint256(-value) : uint256(value);

        while (temp != 0) {
            index--;
            result[index] = bytes1(uint8(48 + temp % 10));
            temp /= 10;
        }

        if (isNegative) {
            result[0] = '-';
        }

        return string(result);
    }
}
