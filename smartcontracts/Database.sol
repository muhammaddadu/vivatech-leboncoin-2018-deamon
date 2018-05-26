pragma solidity ^0.4.23;

contract Database {
  address[] public allBoxes;
  address[] public allProducts;

  // BOXes part
  function addBox(address boxContract) public {
    allBoxes.push(boxContract); 
  }

  function getBoxCount() public constant returns(uint count) {
    return allBoxes.length;
  }

  function getBoxIndex(address boxContract) public constant returns(uint index) {
    uint arrayLength = allBoxes.length;
    for (uint i=0; i<arrayLength; i++) {
      if (allBoxes[i] == boxContract) {
        return i;
      }
    }
    revert();
  }

  // PRODUCTs part
  function addProduct(address productContract) public {
    allProducts.push(productContract); 
  }

  function getProductCount() public constant returns(uint count) {
    return allProducts.length;
  }

  function getProductIndex(address productContract) public constant returns(uint index) {
    uint arrayLength = allProducts.length;
    for (uint i=0; i<arrayLength; i++) {
      if (allProducts[i] == productContract) {
        return i;
      }
    }
    revert();
  }
}
