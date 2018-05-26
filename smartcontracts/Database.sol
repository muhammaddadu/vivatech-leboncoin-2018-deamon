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

  // smart way of deleting objects: find the object with getBoxIndex, then deleteBoxByIndex
  function deleteBoxByIndex(uint index, address boxContract) public returns(bool) {
    // to do: check if sender is the owner of the box
    require(boxContract == allBoxes[index]);
    delete allBoxes[index];
    allBoxes.length--;
    return true;
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

  // smart way of deleting objects: find the object with getProductIndex, then deleteProductByIndex
  function deleteProductByIndex(uint index, address productContract) public returns(bool) {
    // to do: check if sender is the seller or the buyer in the deal
    require(productContract == allProducts[index]);
    delete allProducts[index];
    allProducts.length--;
    return true;
  }
}
