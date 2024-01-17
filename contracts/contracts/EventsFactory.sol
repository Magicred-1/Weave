// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Events.sol";

contract EventFactory {

    // Array to keep track of all created Event contracts
    Event[] public events;


    function createEvent(uint256 expected_attende , string memory _eventName, uint256 _rewardPool, address[] memory _managers, address _userContractAddress) public returns (Event) {
        Event newEvent = new Event(expected_attende , _eventName, _rewardPool, _managers, _userContractAddress,msg.sender);
        events.push(newEvent);
        return newEvent;
    }


    function getEvent(uint index) public view returns (Event) {
        require(index < events.length, "Event index out of bounds");
        return events[index];
    }

    function getAllEvents() public view returns (Event[] memory) {
        return events;
    }

}