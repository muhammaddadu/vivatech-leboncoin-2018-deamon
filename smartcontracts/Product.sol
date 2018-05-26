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
    // to do: add parameters and assign them to members
    name = _name;
    price = _price;
    adsURL = _adsURL;
    boxContract = _boxContract;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function update() public restricted returns (bool) {
    // copy from constructor
    return true;
  }

  function getStatus() public view returns (state) {
    return status;
  }
  // for testing
  function setStatus(state _status) public {
    status = _status;
  }

  // cancel and release the goods from the box
  function buy() public payable {
    // check status
    require(status == state.INBOX);
    // exact price should be paid paid
    require(price == msg.value);

    buyer = msg.sender;
    // check if the calling user is authirised or the status of product contract?
    // require(productContract == msg.sender);
    boxContract = 0;
    // status = state.UNLOCKED; // ???
    status = state.SOLD;
    // unlock the box
    boxContr = Box(boxContract);
    return boxContr.release();
  
  }

  // cancel and release the goods from the box
  function cancel() public restricted {
    // check status
    require(status == state.INBOX);
    // check if the calling user is authirised or the status of product contract?
    // require(productContract == msg.sender);
    boxContract = 0;
    // status = state.UNLOCKED; // ???
    status = state.NOTINBOX;
    // unlock the box
    boxContr = Box(boxContract);
    return boxContr.release();
    // destroy the contract?
  }
}
