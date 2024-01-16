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

    string public immutable EVENTNAME;
    uint256 public immutable REWARDPOOL;
    address[] public immutable MANAGERS;
    address public immutable OWNER;

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



    constructor(string memory _eventName, uint256 _rewardPool, address[] memory _managers, address userContractAddress , address _owner) {
        OWNER= msg.sender;
        EVENTNAME = _eventName;
        REWARDPOOL = _rewardPool;
        MANAGERS = _managers;
        users  = Users(userContractAddress);
    }


    /**
    @params hackerAddress = takes the registered address of the hacker
    @params hackerName takes the arbitary string which we are going to call hackers as
    @dev simply sets the address of the hacker to true
     */
    function registerHacker(address hackerAddress) onlyManagers external  {
        require(addressRegistered[hackerAddress] == true , "Already Registered");
        
        addressRegistered[hackerAddress] = true;

    }


    /**
     * @notice Marks attendance of a hacker for the event.
     * @param hackerAddress The address of the hacker whose attendance is being recorded.
     */
    function markAttendance(address hackerAddress, uint256 attestationId) external onlyManagers {
        require(addressRegistered[hackerAddress], "Hacker not registered");
        require(!hasAttended[hackerAddress], "Attendance already marked");
        require(attendanceAttestation[hackerAddress] == 0, "Attestation ID already assigned");

        hasAttended[hackerAddress] = true;
        attendanceAttestation[hackerAddress] = attestationId;

    }

    





    





    

}