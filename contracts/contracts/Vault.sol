// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "https://github.com/aave/aave-v3-core/blob/master/contracts/interfaces/IPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IVault.sol";

interface IWETHGateway {
  function depositETH(
    address lendingPool,
    address onBehalfOf,
    uint16 referralCode
  ) external payable;
}

contract Vault is Ownable {
    address public GHO_TOKEN_ADDRESS = 0xc4bF5CbDaBE595361438F8c6a187bDc330539c60;
    address public WETH_TOKEN_ADDRESS = 0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c;
    address public USDC_TOKEN_ADDRESS = 0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8;
    address public EURS_TOKEN_ADDRESS = 0x6d906e526a4e2Ca02097BA9d0caA3c382F52278E;
    address public LINK_TOKEN_ADDRESS = 0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5;

    address public leaderboardContractAddress;

    IPool internal constant aaveV3Pool = IPool(0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951);
    IWETHGateway internal constant wETHGateway = IWETHGateway(0x387d311e47e80b498169e6fb51d3193167d89F7D);

    bool public withdrawAllowed = false;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event Exchange(address indexed user, uint256 amount);
    event Borrow(address indexed user, address indexed asset, uint256 amount);

    modifier onlyLeaderboardContract() {
        require(msg.sender == leaderboardContractAddress, "Caller is not leaderboard contract");
        _;
    }

    constructor(
        address _leaderboardContractAddress
    ) Ownable(msg.sender) {
        leaderboardContractAddress = _leaderboardContractAddress;
    }

    function setGHOAddress(address _tokenAddress) external onlyOwner {
        GHO_TOKEN_ADDRESS = _tokenAddress;
    }

    // Risk Management
    function setWithdrawAllowed(bool _withdrawAllowed) external onlyOwner {
        withdrawAllowed = _withdrawAllowed;
    }

    function addCollateral(address _tokenAddress, uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        require(IERC20(_tokenAddress).balanceOf(msg.sender) >= _amount, "Not enough balance");

        borrowAaveGHO(_tokenAddress, _amount);
    }

    function exchangePointsForGHO(uint256 _points, address _user) external onlyLeaderboardContract {
        uint256 _amount = calculateGHOAmount(_points);
        IERC20(GHO_TOKEN_ADDRESS).transfer(_user, _amount);

        emit Exchange(_user, _amount);
    }

    function calculateGHOAmount(uint256 _points) internal pure returns (uint256) {
        // points * 10 %
        return _points * 10 / 100;
    }

    function deposit() external payable {
        require(msg.value > 0, "Deposit value must be greater than 0");

        emit Deposit(msg.sender, msg.value);
    }

    function depositETHtoPool() external payable {
        IWETHGateway(wETHGateway).depositETH{
            value: msg.value
        }(address(aaveV3Pool), address(this), 0);

        emit Deposit(msg.sender, msg.value);
    }

    function borrowAaveGHO(
        address asset,
        uint256 amount
    ) internal {
        // use interest rate as 1 for stable
        aaveV3Pool.borrow(asset, amount, 1, 0, address(this));

        emit Borrow(msg.sender, asset, amount);
    }

    function withdrawFundsFromPool(
        address _tokenAddress,
        uint256 _amount
    ) external onlyOwner {
        require(withdrawAllowed, "Withdraw not allowed");

        aaveV3Pool.withdraw(_tokenAddress, _amount, address(this));

        emit Withdraw(msg.sender, _amount);
    }

    function withdrawGHOFromContract(uint256 _amount) external onlyOwner {
        require(withdrawAllowed, "Withdraw not allowed");
        require(IERC20(GHO_TOKEN_ADDRESS).balanceOf(address(this)) >= _amount, "Not enough balance");

        IERC20(GHO_TOKEN_ADDRESS).transfer(msg.sender, _amount);

        emit Withdraw(msg.sender, _amount);
    }

    function getGHOBalance() external view returns (uint256) {
        return IERC20(GHO_TOKEN_ADDRESS).balanceOf(address(this));
    }

    function getWETHBalance() external view returns (uint256) {
        return IERC20(WETH_TOKEN_ADDRESS).balanceOf(address(this));
    }

    function getGHOAddress() external view returns (address) {
        return GHO_TOKEN_ADDRESS;
    }

    function getWithdrawStatus() external view returns (bool) {
        return withdrawAllowed;
    }
}