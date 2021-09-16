// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./1155/ERC1155.sol";

contract MultiToken is ERC1155 {
    uint256 public constant NFT = 0; //Non Fungib;e
    uint256 public constant FT = 1;

    string public name;
    string public symbol;
    string public documentURI;

    constructor(
        string memory name_, 
        string memory symbol_, 
        string memory documentURI_, 
        address[] memory members,
        uint256[] memory amounts
    )  
    ERC1155(documentURI_) 
    {
        name = name_;
        symbol = symbol_;

        _mint(msg.sender, NFT, 1, "");
        for(uint256 i = 0; i < members.length; i++) {
            _mint(members[i], FT, amounts[i], "");
        }
    }
}