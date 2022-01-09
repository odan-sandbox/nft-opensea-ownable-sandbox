//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract TokenWithoutOwnable is ERC721, AccessControl {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  constructor(
    string memory name,
    string memory symbol,
    address minter
  ) ERC721(name, symbol) {
    _grantRole(MINTER_ROLE, minter);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC721, AccessControl)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function mint(address to, uint256 tokenId) public onlyRole(MINTER_ROLE) {
    _mint(to, tokenId);
  }
}
