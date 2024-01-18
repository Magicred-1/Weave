// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "https://github.com/aave/aave-v3-core/blob/master/contracts/interfaces/IPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IVault.sol";

contract Vault is Ownable, IVault {
    address public GHO_TOKEN_ADDRESS = 0xc4bF5CbDaBE595361438F8c6a187bDc330539c60;
    address public AAVE_POOL_ADDRESS = 0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf;

    address public WETH_TOKEN_ADDRESS = 0xc558dbdd856501fcd9aaf1e62eae57a9f0629a3c;
    address public USDC_TOKEN_ADDRESS = 0x94a9d9ac8a22534e3faca9f4e7f2e2cf85d5e4c8;
    address public EURS_TOKEN_ADDRESS = 0x6d906e526a4e2ca02097ba9d0caa3c382f52278e;
    address public LINK_TOKEN_ADDRESS = 0xf8fb3713d459d7c1018bd0a49d19b4c44290ebe5;

    IPool internal constant aaveV3Pool = IPool(0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951);

    mapping(address => uint256) public pointsBalances;

    boolean public withdrawAllowed = false;

    address[] listOfAllowedTokens;

    constructor(
        address _USDC_TOKEN_ADDRESS,
        address _EURS_TOKEN_ADDRESS,
        address _LINK_TOKEN_ADDRESS,
        address _WETH_TOKEN_ADDRESS
    ) Ownable(msg.sender) {
        listOfAllowedTokens.push(_USDC_TOKEN_ADDRESS);
        listOfAllowedTokens.push(_EURS_TOKEN_ADDRESS);
        listOfAllowedTokens.push(_LINK_TOKEN_ADDRESS);
        listOfAllowedTokens.push(_WETH_TOKEN_ADDRESS);
    }

    function setGHOAddress(address _tokenAddress) external onlyOwner {
        GHO_TOKEN_ADDRESS = _tokenAddress;
    }

    function setAAVEPoolAddress(address _poolAddress) external onlyOwner {
       AAVE_POOL_ADDRESS = _poolAddress;
    }

    // Risk Management
    function setWithdrawAllowed(bool _withdrawAllowed) external onlyOwner {
        withdrawAllowed = _withdrawAllowed;
    }

    function addCollateral(address _token, uint256 _amount) external {
       aaveV3Pool.deposit(_token, _amount, address(this), 0);
    }

    // Todo: Use WETHGateway to send non weth tokens to AAVE
    function addCollateralToAAVEPool(uint256 _amount, address _tokenAddress) external {
        require(_amount > 0, "Amount must be greater than 0");
        require(isTokenAllowed(_tokenAddress), "Token not allowed");
        require(IERC20(_tokenAddress).balanceOf(msg.sender) >= _amount, "Not enough balance");
        require(IERC20(_tokenAddress).allowance(msg.sender, address(this)) >= _amount, "Not enough allowance");

        IERC20(_tokenAddress).transferFrom(msg.sender, address(this), _amount);
        IERC20(_tokenAddress).approve(AAVE_POOL_ADDRESS, _amount);

        aaveV3Pool.deposit(_tokenAddress, _amount, address(this), 0);
    }

    function exchangePointsForGHO(uint256 _amount) external {
        require(pointsBalances[msg.sender] >= _amount, "Not enough points");
        pointsBalances[msg.sender] -= _amount;
        IERC20(GHO_TOKEN_ADDRESS).transfer(msg.sender, _amount);
    }

    // function depositETH() external payable {
    //     IWETH(WETH_TOKEN_ADDRESS).deposit{value: msg.value}();
    // }

    function borrowAaveGHO(
            uint256 amount
        ) internal {
            // use interest rate as 1 for stable
            aaveV3Pool.borrow(GHO_TOKEN_ADDRESS, amount, 1, 0, address(this));
    }

    function withdrawGHOFromContract(uint256 _amount) external onlyOwner {
        IERC20(GHO_TOKEN_ADDRESS).transfer(msg.sender, _amount);
    }

    function getGHOBalance() external view returns (uint256) {
        return IERC20(GHO_TOKEN_ADDRESS).balanceOf(address(this));
    }

    function getWETHBalance() external view returns (uint256) {
        return IERC20(WETH_TOKEN_ADDRESS).balanceOf(address(this));
    }

    function getAAVEPoolAddress() external view returns (address) {
       return AAVE_POOL_ADDRESS;
    }

    function getUserBalance(address _user) external view returns (uint256) {
        return pointsBalances[_user];
    }

    function getGHOAddress() external view returns (address) {
        return GHO_TOKEN_ADDRESS;
    }

    function isTokenAllowed(address _tokenAddress) internal view returns (bool) {
        for (uint i = 0; i < listOfAllowedTokens.length; i++) {
            if (listOfAllowedTokens[i] == _tokenAddress) {
                return true;
            }
        }
        return false;
    }
}