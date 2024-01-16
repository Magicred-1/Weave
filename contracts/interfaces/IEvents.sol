// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ILeaderboard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IUsers.sol";

interface IEvents is IERC20, IUser {
    struct Event {
        uint256 eventId;
        address eventOwner;
        string eventLogo;
        string eventName;
        string eventDescription;
        uint256 eventStartDate;
        uint256 eventEndDate;
        string eventWebsite;
        string eventMaxParticipants;
        Coordinates eventCoordinates;
        address[] eventManagers;
        uint256 eventRadius;
        string eventRadiusColor;
    }

    // int instead of uint because coordinates can be negative
    struct Coordinates {
        int256 latitude;
        int256 longitude;
    }

    event EventUpdated(address indexed eventOwner, string eventName);

    event EventDeleted(address indexed eventOwner, string eventName);

    event EventAttestationCreated(address indexed user, address indexed eventAddress);

    function updateEventName(string memory _eventName) external onlyOwner returns (bool);

    function updateEventDescription(string memory _eventDescription) external onlyOwner returns (bool);

    function updateEventStartDate(uint256 _eventStartDate) external onlyOwner returns (bool);

    function updateEventEndDate(uint256 _eventEndDate) external onlyOwner returns (bool);

    function updateEventWebsite(string memory _eventWebsite) external onlyOwner returns (bool);

    function updateEventCoordinates(int256 _latitude, int256 _longitude) external onlyOwner returns (bool);

    function addEventManager(address _eventManager) external onlyOwner returns (bool);

    function removeEventManager(address _eventManager) external onlyOwner;

    function deleteEvent() external onlyOwner returns (bool);

    function getEvent() external view returns (Event memory);

    function getEventCoordinates() external view returns (address);

    function getEventManagers() external view returns (address[] memory);
}

// IEVents.sol