pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Exchange is Context, ReentrancyGuard, Ownable {

    uint public rate;
    uint public max;
    IERC20 public token;
    mapping(address => uint) exchangers;
    address public cfo;

    event Exchanged(address indexed who, uint ethAmount, uint tokenAmount);

    constructor(uint _rate, address _cfo, IERC20 _token) {
        rate = _rate;
        max = 0;
        cfo = _cfo;
        token = _token;
    }

    function setRate(uint _rate) public onlyOwner {
        rate = _rate;
    }

    function setMax(uint _max) public onlyOwner {
        max = _max;
    }

    function setCfo(address _cfo) public onlyOwner {
        cfo = _cfo;
    }

    function exchange() public payable nonReentrant {
        require(msg.value > 0);
        address recipient = _msgSender();
        uint amt = msg.value * rate;
        if (max > 0) {
            uint exchanged = exchangers[recipient];
            require(amt + exchanged < max);
        }
        token.transferFrom(cfo, recipient, amt);
        payable(cfo).transfer(msg.value);
        exchangers[recipient] += amt;

        emit Exchanged(recipient, msg.value, amt);
    }

}
