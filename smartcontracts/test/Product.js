const Product = artifacts.require("Product.sol");

contract('Product', async (accounts) => {

  var state = {
    NOTINBOX: 0,
    INBOX: 1,
    SOLD: 2,
    TAKEN: 3
  };

  it("simple test", async () => {
    let instance = await Product.new("Product 1", 1000000, "https://leboncoin.fr/", 0);
    // let instance = await Box.new({from: accounts[0]});

    assert.equal(state.NOTINBOX, (await instance.getStatus()).valueOf());

    await instance.setStatus(state.INBOX);
    assert.equal(state.INBOX, (await instance.getStatus()).valueOf());

    await instance.setStatus(state.SOLD);
    assert.equal(state.SOLD, (await instance.getStatus()).valueOf());

    await instance.setStatus(state.TAKEN);
    assert.equal(state.TAKEN, (await instance.getStatus()).valueOf());
  })
});
