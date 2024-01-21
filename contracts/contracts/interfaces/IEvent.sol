// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IEvent {
    function createAttestation(address _participantAddress) external;
    
    function updateEventName(string memory _newEventName) external returns (bool);

    function isParticipantOnboarded(address participantAddress) external view returns (bool);

    function addManager(address newManager) external returns (bool);

    function getManagers() external view returns (address[] memory);

    function removeManagerOptimized(address _manager) external;

    function claimPoints() external returns (bool);

    function setEventName(string memory _eventName) external;

    function setEventDescription(string memory _eventDescription) external;

    function setEventStartingDate(uint256 _eventStartingDate) external;

    function setEventEndDate(uint256 _eventEndDate) external;

    function setLatitude(int256 _latitude) external;

    function setLongitude(int256 _longitude) external;

    function setEventRadius(uint256 _eventRadius) external;

    function setEventRadiusColor(string memory _eventRadiusColor) external;

    function getEventName() external view returns (string memory);

    function getEventDescription() external view returns (string memory);

    function getEventStartingDate() external view returns (uint256);

    function getEventEndDate() external view returns (uint256);

    function getLatitude() external view returns (int256);

    function getLongitude() external view returns (int256);

    function getEventRadius() external view returns (uint256);

    function getEventRadiusColor() external view returns (string memory);

    function getAttendedParticipants() external view returns (address[] memory);

    function getRegisteredParticipants() external view returns (address[] memory);
}
