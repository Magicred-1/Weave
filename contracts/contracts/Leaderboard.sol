pragma solidity ^0.8.9;

contract Leaderboard {
    struct User {
        uint256 rank;
        string nickName;
        address[] listofEventsAttended;
        uint256 points;
    }

    struct LeaderboardEntry {
        address[] users;
        uint256[] points;
    }

    mapping(address => User) public users;
    mapping(address => bool) public addressRegistered;



    
}