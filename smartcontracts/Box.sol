pragma solidity ^0.4.23;

contract Box {
  address public owner;
  uint public pricePerDay; // in wei?
  int public lat; // lattitude multiplied by 10 000?
  int public long; // longitude multiplied by 10 000?
  string dimentions; // L*W*H in cm
  address public productContract;
  
  enum state {AVAILABLE, LOCKED, UNLOCKED} // , RESERVED, ...?
  state status;

  constructor(
    uint _pricePerDay,
    int _lat,
    int _long,
    string _dimentions
  ) public {
    owner = msg.sender;
    status = state.AVAILABLE;
    pricePerDay = _pricePerDay;
    lat = _lat;
    long = _long;
    dimentions = _dimentions;
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
    // check ?
    // if (msg.sender == ...) ...;
    status = _status;
  }

  // use the box for your deal
  function utilize(address _productContract) public {
    // check status
    require(status == state.AVAILABLE);
    productContract = _productContract;
    status = state.LOCKED;
  }

  // unlock the box
  function release() public {
    // check status
    require(status == state.LOCKED);
    // check if the calling user is authirised or the status of product contract?
    // require(productContract == msg.sender);
    productContract = 0;
    // status = state.UNLOCKED; // ???
    status = state.AVAILABLE;
  }
}
