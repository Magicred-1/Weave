// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ILeaderboard.sol";

interface IVault is ILeaderboard, IERC20, Ownable {
    event PoolCreated(address indexed token, uint256 amount, uint256 poolAmount);

    function depositToVault(address _token, uint256 _amount) external;

    function createPool(address _token, address eventAddress, uint256 _amount) external;

    function withdrawFromVault(address _token, uint256 _amount, address eventAddress) external;

    function withdrawFromPool(address _token, address eventAddress) external;

    function getPoolAmount(address eventAddress) external view returns (uint256);

    function getAllPools() external view returns (address[] memory);

    function addPaymentToken(IERC20 _token) external;
}
