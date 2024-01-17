// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


import "@openzeppelin/contracts/access/Ownable.sol";
import "./Users.sol";


contract Event {

    Users users;

    struct Coordinates {
        uint256 latitude;
        uint256 longitude;
    }

    struct StartTimeEndTime{
        uint256 startTime;
        uint256 endTime;
    }

    string public immutable EVENTNAME;
    uint256 public immutable REWARDPOOL;
    address[] public immutable MANAGERS;
    address public immutable OWNER;
    
    uint256 public constant MAX_POINTS = 100;
    uint256 public constant MIN_POINTS = 1;
    uint256 public constant TOTAL_EXPECTED_ATTENDEES = 100; // Set this based on your expectation
    uint256 public attendeeCount = 0;

    address[] public hackersRegistered;
    address[] public hackersAttended;

    // mapping of address who were registered for the event
    mapping(address => bool) public addressRegistered;
    mapping(address => bool) public hasAttended;
    mapping(address => uint256) public attendanceAttestation;


    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == OWNER, "You are not owner");
        _;
    }

    modifier onlyManagers(){
         require(isManager(msg.sender), "Caller is not a manager");
        _;
    }

    // Helper function to check if an address is a manager
    function isManager(address _user) internal view returns (bool) {
        for (uint256 i = 0; i < MANAGERS.length; i++) {
            if (MANAGERS[i] == _user) {
                return true;
            }
        }
        return false;
    }



    // ENum for Event status
    enum EventStatus { Upcoming, Ongoing, Completed, Cancelled }
    EventStatus public status;


    constructor(uint256 expected_attendies , string memory _eventName, uint256 _rewardPool, address[] memory _managers, address userContractAddress , address _owner) {
        OWNER= msg.sender;
        EVENTNAME = _eventName;
        REWARDPOOL = _rewardPool;
        MANAGERS = _managers;
        TOTAL_EXPECTED_ATTENDEES = expected_attendies;
        users  = Users(userContractAddress);
        status = EventStatus.Upcoming;
    }


    /**
    @params hackerAddress = takes the registered address of the hacker
    @params hackerName takes the arbitary string which we are going to call hackers as
    @dev simply sets the address of the hacker to true
     */
    function registerHacker(address hackerAddress) onlyManagers external  {
        require(addressRegistered[hackerAddress] == true , "Already Registered");
        addressRegistered[hackerAddress] = true;
        users.addEventParticipated(userAddress,address(this));
        hackersRegistered.push(hackerAddress);
    }

     /**
     * @notice Marks attendance of a hacker for the event.
     * @param hackerAddress The address of the hacker whose attendance is being recorded.
     * @param attestationId Unique identifier for the attendance proof.
     */
    function markAttendance(address hackerAddress, uint256 attestationId) external onlyManagers {
        require(addressRegistered[hackerAddress], "Hacker not registered");
        require(!hasAttended[hackerAddress], "Attendance already marked");
        require(attendanceAttestation[hackerAddress] == 0, "Attestation ID already assigned");

        // Increment the attendee count as a new attendee is being marked
        attendeeCount++;

        // Calculate points for the attendee based on their order of arrival
        uint256 pointsForAttendee = calculatePointsForAttendee(attendeeCount);

        hasAttended[hackerAddress] = true;
        attendanceAttestation[hackerAddress] = attestationId;

        // Add the hacker to the event's participation list and update their points in the Users contract
        users.addEventParticipated(hackerAddress, address(this));
        users.updatePoints(hackerAddress, pointsForAttendee);

        hackersAttended.push(hackerAddress);
    }

    /**
     * @notice Calculates points for the attendee based on their order of arrival with linear decay.
     * @param order The order number of the attendee.
     * @return Points for the attendee.
     */
    function calculatePointsForAttendee(uint256 order) internal view returns (uint256) {
        if (order == 1) {
            return MAX_POINTS;
        }

        // Calculate the decay rate per attendee
        uint256 decayRate = (MAX_POINTS - MIN_POINTS) / (TOTAL_EXPECTED_ATTENDEES - 1);

        // Calculate the points based on the order, ensuring it doesn't fall below MIN_POINTS
        uint256 points = MAX_POINTS - (decayRate * (order - 1));
        
        return points < MIN_POINTS ? MIN_POINTS : points;
    }



    function updateEventName(string memory newName) public onlyOwner {
        EVENTNAME = newName;
    }


    function updateRewardPool(uint256 newRewardPool) public onlyOwner {
        require(newRewardPool > REWARDPOOL , "New Reward Pool Cannot Be Less than Previous Reward Pool");
        REWARDPOOL = newRewardPool;
    }

    function updateManagers(address[] memory newManagers) public onlyOwner {
        MANAGERS = newManagers;
    }


    function isHackerRegistered(address hackerAddress) public view returns (bool) {
        return addressRegistered[hackerAddress];
    }

    function updateEventStatus(EventStatus newStatus) public onlyOwner {
        status = newStatus;
    }


    function checkEventStatus() public view returns (EventStatus) {
        return status;
    }

    function setEventTiming(uint256 start, uint256 end) public onlyOwner {
        startTime = start;
        endTime = end;
    }

    function addManager(address newManager) public onlyOwner {
    // Ensure the new manager is not already in the list
        for (uint i = 0; i < MANAGERS.length; i++) {
            require(MANAGERS[i] != newManager, "Manager already exists");
        }
        MANAGERS.push(newManager);
    }

    function removeManagerOptimized(address manager) public onlyOwner {
        int256 index = -1;
        for (uint i = 0; i < MANAGERS.length; i++) {
            if (MANAGERS[i] == manager) {
                index = int256(i);
                break;
            }
        }
        require(index >= 0, "Manager not found");

        // Swap with the last element and remove the last element
        MANAGERS[uint256(index)] = MANAGERS[MANAGERS.length - 1];
        MANAGERS.pop();
    }

    function getRegisteredHackers() public view returns (address[] memory) {
        return hackersRegistered;
    }


    function getTotalParticipants() public view returns (uint256) {
        return hackersRegistered.length;
    }

    function getAttendanceRate() public view returns (uint256) {
        if (hackersRegistered.length == 0) return 0;
        return (hackersAttended.length * 100) / hackersRegistered.length;
    }

    



}