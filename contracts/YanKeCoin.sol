// contracts/YanKeCoin.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YanKeCoin is ERC20 {
    constructor() ERC20("YanKeCoin", "YKC") {
        _mint(msg.sender, 1000_000_000 * 10 ** decimals());
    }
}