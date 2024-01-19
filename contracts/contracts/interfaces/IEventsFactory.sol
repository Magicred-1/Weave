// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IEventsFactory {
    event EventCreated(address indexed eventOwner, address indexed eventAddress, string eventName);

    function createEvent(
        string memory _eventName,
        string memory _eventDescription,
        uint256 _eventStartDate,
        uint256 _eventEndDate,
        string memory _eventWebsite,
        string memory _eventMaxParticipants,
        IERC20 _eventToken,
        int256 _latitude,
        int256 _longitude,
        address[] memory _eventManagers,
        uint256 _eventRadius,
        string memory _eventRadiusColor,
        address _eventOwner
    ) external returns (address);

    function isOwnerAlreadyCreatedEvent(address _eventOwner) external view returns (bool);

    function isContractAnEvent(address _eventAddress) external view returns (bool);

    function getEventsByOwner(address _eventOwner) external view returns (address);

    function getAllEvents() external view returns (address[] memory);

    function calculatingPriceToCreate(uint256 _eventStartDate, uint256 _eventEndDate, uint256 _eventRadius) external view returns (uint256);
}

// IEVentsFactory.sol