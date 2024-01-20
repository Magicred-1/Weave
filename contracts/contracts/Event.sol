// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./interfaces/IEvent.sol";
import "./interfaces/IWeave.sol";
import "./interfaces/ILeaderboard.sol";

contract Event {
    using SafeMath for uint256;

    IWeave public weave;
    ILeaderboard public leaderboard;

    address[] public registeredParticipants;
    address[] public attendedParticipants;

    mapping(address => bool) public hasAttended;
    mapping(address => bool) public hasClaimed;
    mapping(address => bool) public isEventManager;

    address[] public eventManagers;

    address public owner;

    string public eventName;
    string public eventDescription;
    uint256 public eventStartingDate;
    uint256 public eventEndDate;
    int256 public latitude;
    int256 public longitude;
    uint256 public eventRadius;
    string public eventRadiusColor;

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

    modifier onlyEventManager() {
        require(isEventManager[msg.sender], "Only event managers can call this");
        _;
    }

    constructor(
        string memory _eventName,
        string memory _eventDescription,
        uint256 _eventStartingDate,
        uint256 _eventEndDate,
        int256 _latitude,
        int256 _longitude,
        address[] memory _eventManagers,
        uint256 _eventRadius,
        string memory _eventRadiusColor,
        address _weaveContractAddress,
        address _leaderboardContractAddress
    ) {
        eventName = _eventName;
        eventDescription = _eventDescription;
        eventStartingDate = _eventStartingDate;
        eventEndDate = _eventEndDate;
        latitude = _latitude;
        longitude = _longitude;
        eventRadius = _eventRadius;
        eventRadiusColor = _eventRadiusColor;
        eventManagers = _eventManagers;

        weave = IWeave(_weaveContractAddress);
        leaderboard = ILeaderboard(_leaderboardContractAddress);

        for (uint256 i = 0; i < _eventManagers.length; i++) {
            isEventManager[_eventManagers[i]] = true;
        }
    }

    function createAttestation(address _participantAddress) external onlyEventManager {
        require(isParticipantOnboarded(_participantAddress), "Participant not onboarded");
        require(!hasAttended[_participantAddress], "Participant already attended");
        hasAttended[_participantAddress] = true;

        emit ParticipantAttended(_participantAddress);
    }

    function updateEventName(string memory _newEventName) public onlyEventManager returns (bool) {
        eventName = _newEventName;
        emit EventNameUpdated(_newEventName);
        return true;
    }

    function isParticipantOnboarded(address participantAddress) public view returns (bool) {
        return weave.isParticipantOnboarded(participantAddress);
    }

    function addManager(address newManager) public onlyEventManager returns (bool) {
        require(eventManagers.length < 5, "eventManagers must be less than or equal to 5");

        for (uint256 i = 0; i < eventManagers.length; i++) {
            require(eventManagers[i] != newManager, "Manager already exists");
        }
        eventManagers.push(newManager);

        emit ManagerAdded(newManager);

        return true;
    }

    function getManagers() public view returns (address[] memory) {
        return eventManagers;
    }

    function removeManagerOptimized(address _manager) public onlyEventManager {
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
