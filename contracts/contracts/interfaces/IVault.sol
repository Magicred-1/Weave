// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IVault {
    function setGHOAddress(address _tokenAddress) external;
    function setAAVEPoolAddress(address _poolAddress) external;
    function setWithdrawAllowed(bool _withdrawAllowed) external;
    function addCollateral(address _token, uint256 _amount) external;
    function addCollateralToAAVEPool(uint256 _amount, address _tokenAddress) external;
    function exchangePointsForGHO(uint256 _amount) external;
    // function depositETH() external payable;
    function withdrawGHOFromContract(uint256 _amount) external;
    function getGHOBalance() external view returns (uint256);
    function getWETHBalance() external view returns (uint256);
    function getAAVEPoolAddress() external view returns (address);
    function getUserBalance(address _user) external view returns (uint256);
    function getGHOAddress() external view returns (address);
}

