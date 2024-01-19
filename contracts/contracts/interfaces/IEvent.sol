// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IEvent {
    function createAttestation(address _participantAddress) external;

    function updateEventName(string memory _newEventName) external returns (bool);

    function updateRewardPool(uint256 _newRewardPool) external returns (bool);

    function updateManagers(address[] memory _newManagers) external returns (bool);

    function isParticipantOnboarded(address participantAddress) external view returns (bool);

    function addManager(address _newManager) external;

    function removeManagerOptimized(address _manager) external;

    function claimPoints() external;

    function getRegisteredParticipants() external view returns (address[] memory);

    function getTotalParticipants() external view returns (uint256);

    function getAttendanceRate() external view returns (uint256);
}
