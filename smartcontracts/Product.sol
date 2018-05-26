pragma solidity ^0.4.23;

import "./Box.sol";

contract Product {
  address public owner; // seller
  address public buyer;
  string public name;
  uint public price; // in wei?
  // string dimentions; // L*W*H in cm
  string public adsURL;
  address public boxContract;
  Box boxContr;
  
  enum state {NOTINBOX, INBOX, SOLD, TAKEN}
  state status;

  constructor(
    string _name,
    uint _price,
    string _adsURL,
    address _boxContract
  ) public {
    owner = msg.sender;
    status = state.NOTINBOX;
    name = _name;
    price = _price;
    adsURL = _adsURL;
    boxContract = _boxContract;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function update(
    string _name,
    uint _price,
    string _adsURL
  ) public restricted returns (bool) {
    name = _name;
    price = _price;
    adsURL = _adsURL;
    return true;
  }

  function getStatus() public view returns (state) {
    return status;
  }
  // for testing
  function setStatus(state _status) public {
    status = _status;
  }

  // buy and release the goods from the box
  function buy() public payable {
    // check status
    require(status == state.INBOX);
    // exact price should be paid paid
    require(price == msg.value);

    buyer = msg.sender;
    boxContract = 0;
    status = state.SOLD;
    // unlock the box
    boxContr = Box(boxContract);
    return boxContr.release();
  }

  // cancel and release the goods from the box
  function cancel() public restricted {
    // check status
    require(status == state.INBOX);
    boxContract = 0;
    status = state.NOTINBOX;
    // unlock the box
    boxContr = Box(boxContract);
    return boxContr.release();
    // destroy the contract?
  }
}
