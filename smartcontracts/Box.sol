pragma solidity ^0.4.23;

contract Box {
  address public owner;
  uint public pricePerDay; // in wei?
  int public lat; // lattitude multiplied by 1000?
  int public long; // longitude multiplied by 1000?
  address public productContract;
  
  enum state {AVAILABLE, LOCKED} // , RESERVED, ...?
  state status;

  constructor() public {
    owner = msg.sender;
    status = state.AVAILABLE;
    // to do: add parameters and assign them to members
  }

  // will we us it?
  modifier restricted() {
    if (msg.sender == owner) _;
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
}
