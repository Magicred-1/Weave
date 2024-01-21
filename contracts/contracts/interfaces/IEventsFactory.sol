// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IEventFactory {
    event EventCreated(address indexed eventAddress);

    struct EventDetails {
        string eventName;
        string eventDescription;
        uint256 eventStartDate;
        uint256 eventEndDate;
        int256 latitude;
        int256 longitude;
        address[] eventManagers;
        uint256 eventRadius;
        string eventRadiusColor;
    }

    function createEvent(
        string memory _eventName,
        string memory _eventDescription,
        uint256 _eventStartDate,
        uint256 _eventEndDate,
        int256 _latitude,
        int256 _longitude,
        address[] memory _eventManagers,
        uint256 _eventRadius,
        string memory _eventRadiusColor,
        IERC20 _eventToken,
        uint256 _amount
    ) external;

    function isUserHasAlreadyCreatedEvent(address _user) external view returns (bool);

    function isContractAnEvent(address _eventAddress) external view returns (bool);

    function getAllEvents() external view returns (address[] memory);

    function getAllEventsDetails() external view returns (
        string[] memory,
        string[] memory,
        uint256[] memory,
        uint256[] memory,
        int256[] memory,
        int256[] memory,
        uint256[] memory,
        string[] memory
    );

    function getEventManagers(address _eventAddress) external view returns (address[] memory);

    function calculatingPriceToCreate(uint256 _eventStartDate, uint256 _eventEndDate, uint256 _eventRadius) external pure returns (uint256);

    function setVaultAddress(address _vaultAddress) external;

    function setWeaveAddress(address _weaveAddress) external;

    function setLeaderboardAddress(address _leaderboardAddress) external;
}
