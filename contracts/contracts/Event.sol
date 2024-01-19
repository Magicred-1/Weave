// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IEvent.sol";
import "./interfaces/IVault.sol";
import "./interfaces/ILeaderboard.sol";
import "./interfaces/IWeave.sol";
import "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Event is IEvent {
    using SafeMath for uint256;
    
    address public weaveContractAddress;
    address public leaderboardContractAddress;
    address private vaultContractAddress;
    address private easContractAddress;

    IWeave public weave = IWeave(weaveContractAddress);
    IVault public vault = IVault(vaultContractAddress);
    ILeaderboard public leaderboard = ILeaderboard(leaderboardContractAddress);
    
    IEAS public eas;
    bytes32 constant schema = 0x7fe79bf55dc0df94d72d713067bb6162828f6c7b66458ea3661b41d4d02fc40f;


    string public eventName;
    string public eventDescription;
    uint256 public eventStartDate;
    uint256 public eventEndDate;
    string public eventWebsite;
    uint256 public eventMaxParticipants;
    int256 public latitude;
    int256 public longitude;
    address[] public eventManagers;
    uint256 public eventRadius;
    string public eventRadiusColor;
    address public eventOwner;

    uint256 public rewardPool;

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

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == eventOwner, "You are not owner");
        _;
    }

    modifier onlyManagers(){
         require(isManager(msg.sender), "Caller is not a manager");
        _;
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
        address _eventOwner,
        address _weaveContractAddress,
        address _vaultContractAddress,
        address _leaderboardContractAddress
    ) {
        eventName = _eventName;
        eventDescription = _eventDescription;
        eventStartDate = _eventStartDate;
        eventEndDate = _eventEndDate;
        eventWebsite = _eventWebsite;
        eventMaxParticipants = _eventMaxParticipants;
        latitude = _latitude;
        longitude = _longitude;
        eventManagers = _eventManagers;
        eventRadius = _eventRadius;
        eventRadiusColor = _eventRadiusColor;
        eventOwner = _eventOwner;
        weaveContractAddress = _weaveContractAddress;
        vaultContractAddress = _vaultContractAddress;
        leaderboardContractAddress = _leaderboardContractAddress;
    }
    
    function createAttestation(address _participantAddress) external onlyManagers {
        require(isParticipantOnboarded(_participantAddress), "Participant not onboarded");
        require(!hasAttended[_participantAddress], "Participant already attended");
        hasAttended[_participantAddress] = true;

        emit ParticipantAttended(_participantAddress);
    }

    function updateEventName(string memory _newEventName) public onlyOwner returns (bool) {
        eventName = _newEventName;
        emit EventNameUpdated(_newEventName);
        return true;
    }

    function updateRewardPool(uint256 _newRewardPool) public onlyOwner returns (bool) {
        require(_newRewardPool > rewardPool, "New Reward Pool Cannot Be Less than Previous Reward Pool");
        rewardPool = _newRewardPool;
        emit RewardPoolUpdated(_newRewardPool);
        return true;
    }

    function updateManagers(address[] memory _newManagers) public onlyOwner returns (bool) {
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

    function getTotalParticipants() public view returns (uint256) {
        return registeredParticipants.length;
    }

    function getAttendanceRate() public view returns (uint256) {
        if (registeredParticipants.length == 0) {
            return 0;
        }
        return (registeredParticipants.length.mul(100)) / registeredParticipants.length;
    }
}