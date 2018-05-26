const Database = artifacts.require("Database.sol");

contract('Database', async (accounts) => {

  // BOXes part
  it("simple test with boxes", async () => {
    let sampleBox = 111222333;
    let instance = await Database.new();

    var count = 0;
    assert.equal(count, (await instance.getBoxCount()).valueOf());

    await instance.addBox(sampleBox);
    count = count + 1;
    assert.equal(count, (await instance.getBoxCount()).valueOf());

    assert.equal(count-1, (await instance.getBoxIndex(sampleBox)).valueOf());
  })

  it("check with a wrong box", async () => {
    try {
      (await instance.getBoxIndex(sampleBox+1)).valueOf();
      console.log("Shouldn't be displayed!");
    } catch {}
  })

  // PRODUCTs part
  it("simple test with products", async () => {
    let sampleProduct = 111222333444;
    let instance = await Database.new();

    var count = 0;
    assert.equal(count, (await instance.getProductCount()).valueOf());

    await instance.addProduct(sampleProduct);
    count = count + 1;
    assert.equal(count, (await instance.getProductCount()).valueOf());

    assert.equal(count-1, (await instance.getProductIndex(sampleProduct)).valueOf());
  })

  it("check with a wrong product", async () => {
    try {
      (await instance.getProducIndex(sampleProduct+1)).valueOf();
      console.log("Shouldn't be displayed!");
    } catch {}
  })
});
