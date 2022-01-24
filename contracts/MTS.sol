pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract MTS is ERC20, Ownable {

    constructor(address cfo) ERC20("META SEA TOKEN", "MTS") {
        _mint(cfo, 100000000 ether);
    }

}
