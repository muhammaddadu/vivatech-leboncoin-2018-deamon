const Box = artifacts.require("Box.sol");

contract('Box', async (accounts) => {

  var state = {
    AVAILABLE: 0,
    LOCKED: 1,
    UNLOCKED: 2
  };

  it("simple test", async () => {
    let instance = await Box.new(1000000, 48*10000, 9*10000, "40*30*30");
    // let instance = await Box.new({from: accounts[0]});

    assert.equal(state.AVAILABLE, (await instance.getStatus()).valueOf());

    await instance.setStatus(state.LOCKED);
    assert.equal(state.LOCKED, (await instance.getStatus()).valueOf());

    await instance.setStatus(state.UNLOCKED);
    assert.equal(state.UNLOCKED, (await instance.getStatus()).valueOf());

    await instance.setStatus(state.AVAILABLE);
    assert.equal(state.AVAILABLE, (await instance.getStatus()).valueOf());
    
    await instance.utilize(accounts[0]);
    assert.equal(state.LOCKED, (await instance.getStatus()).valueOf());
    
    await instance.release();
    assert.equal(state.AVAILABLE, (await instance.getStatus()).valueOf());
/*
    instance.transfer(accounts[2], 50, {from: accounts[1]});
    assert.equal(50, (await instance.balanceOf(accounts[1])).valueOf());
*/
  });

  it("releasing", async () => {
    let instance = await Box.new(1000000, 48*10000, 9*10000, "40*30*30");

    await instance.setStatus(state.LOCKED);
    assert.equal(state.LOCKED, (await instance.getStatus()).valueOf());

    await instance.release();
    assert.equal(state.AVAILABLE, (await instance.getStatus()).valueOf());
  })
});
