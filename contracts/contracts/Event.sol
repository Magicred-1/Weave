// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./interfaces/IEvent.sol";
import "./interfaces/IVault.sol";
import "./interfaces/IWeave.sol";
import "./interfaces/ILeaderboard.sol";

contract Event is Ownable {
    using SafeMath for uint256;

    struct EventDetails {
        string eventName;
        string eventDescription;
    }

    struct Location {
        int256 latitude;
        int256 longitude;
    }

    struct EventSettings {
        uint256 eventStartDate;
        uint256 eventEndDate;
        string eventWebsite;
        uint256 eventMaxParticipants;
        uint256 eventRadius;
        string eventRadiusColor;
    }

    address public weaveContractAddress;
    address public leaderboardContractAddress;
    address private vaultContractAddress;

    IWeave public weave = IWeave(weaveContractAddress);
    IVault public vault = IVault(vaultContractAddress);
    ILeaderboard public leaderboard = ILeaderboard(leaderboardContractAddress);

    EventDetails public eventDetails;
    Location public location;
    EventSettings public eventSettings;

    address[] public eventManagers;
    address[] public registeredParticipants;
    address[] public attendedParticipants;

    mapping(address => bool) public hasAttended;
    mapping(address => bool) public hasClaimed;

    // Event emitted when a participant attends an event
    event ParticipantAttended(address indexed participant);

    // Event emitted when the event name is updated
    event EventNameUpdated(string newEventName);

    // Event emitted when the reward pool is updated
    event RewardPoolUpdated(uint256 newRewardPool);

    // Event emitted when eventManagers are updated
    event ManagersUpdated(address[] newManagers);

    // Event emitted when a new manager is added
    event ManagerAdded(address newManager);

    // Event emitted when a manager is removed
    event ManagerRemoved(address removedManager);

    // Event emitted when a participant claims points
    event PointsClaimed(address indexed participant);

    modifier onlyManagers(){
         require(isManager(msg.sender), "Caller is not a manager");
        _;
    }

    constructor(
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
    ) Ownable(msg.sender) {
        eventDetails = EventDetails(_eventName, _eventDescription);
        location = Location(_latitude, _longitude);
        eventSettings = EventSettings(
            _eventStartDate,
            _eventEndDate,
            _eventWebsite,
            _eventMaxParticipants,
            _eventRadius,
            _eventRadiusColor
        );

        eventManagers = _eventManagers;
        weaveContractAddress = _weaveContractAddress;
        vaultContractAddress = _vaultContractAddress;
        leaderboardContractAddress = _leaderboardContractAddress;
    }

    // Helper function to check if an address is a manager
    function isManager(address _user) internal view returns (bool) {
        for (uint256 i = 0; i < eventManagers.length; i++) {
            if (eventManagers[i] == _user) {
                return true;
            }
        }
        return false;
    }

    function createAttestation(address _participantAddress) external onlyManagers {
        require(isParticipantOnboarded(_participantAddress), "Participant not onboarded");
        require(!hasAttended[_participantAddress], "Participant already attended");
        hasAttended[_participantAddress] = true;

        emit ParticipantAttended(_participantAddress);
    }

    function updateEventName(string memory _newEventName) public onlyManagers returns (bool) {
        eventDetails.eventName = _newEventName;
        emit EventNameUpdated(_newEventName);
        return true;
    }

    function updateManagers(address[] memory _newManagers) public onlyManagers returns (bool) {
        require(_newManagers.length <= 5, "eventManagers must be less than or equal to 5");
        eventManagers = _newManagers;
        emit ManagersUpdated(_newManagers);
        return true;
    }

    function isParticipantOnboarded(address participantAddress) public view returns (bool) {
        return weave.isParticipantOnboarded(participantAddress);
    }

    function addManager(address newManager) public onlyOwner returns (bool) {
        require(eventManagers.length < 5, "eventManagers must be less than or equal to 5");

        for (uint256 i = 0; i < eventManagers.length; i++) {
            require(eventManagers[i] != newManager, "Manager already exists");
        }
        eventManagers.push(newManager);

        emit ManagerAdded(newManager);

        return true;
    }

    function removeManagerOptimized(address _manager) public onlyOwner {
        bool managerFound = false;
        for (uint i = 0; i < eventManagers.length; i++) {
            if (eventManagers[i] == _manager) {
                managerFound = true;
                eventManagers[i] = eventManagers[eventManagers.length - 1];
                eventManagers.pop();
                emit ManagerRemoved(_manager);
                break;
            }
        }
        require(managerFound, "Manager not found");
    }

    function claimPoints() public returns (bool) {
        require(hasAttended[msg.sender], "Attendance not marked");
        require(!hasClaimed[msg.sender], "Points already claimed");

        hasClaimed[msg.sender] = true;
        leaderboard.updateLeaderboard(msg.sender);

        emit PointsClaimed(msg.sender);

        return true;
    }

    function getRegisteredParticipants() public view returns (address[] memory) {
        return registeredParticipants;
    }
}