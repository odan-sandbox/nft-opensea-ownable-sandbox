//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "./TokenWithoutOwnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenWithOwnable is TokenWithoutOwnable, Ownable {
  constructor(
    string memory name,
    string memory symbol,
    address minter,
    address owner
  ) TokenWithoutOwnable(name, symbol, minter) {
    transferOwnership(owner);
  }
}
