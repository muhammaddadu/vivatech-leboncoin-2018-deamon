const EventEmitter = require('events');
const Contracts = require('./Contracts');

module.exports = class Deamon {
    constructor(contracts) {
        this.contracts = contracts || new Contracts();
        this.addresses = {};
    }

    watch(address) {
        if (!this.addresses[address]) {
            this.addresses[address] = new EventEmitter();
        }

        return this.addresses[address];
    }

    start() {
        this.pollForChanges(5000);
    }

    async pollForChanges(pollDelay) {
        try {
            await Object.keys(this.addresses).forEach(async (address) => {
                try {
                    const contractAtAddress = this.contracts.get('box').at(address);
                    const contractFields = ['owner', 'pricePerDay', 'lat', 'long', 'productContract', 'getStatus'];
                    const values = await contractAtAddress.getValues(contractFields);

                    this.addresses[address].emit('data', values);
                } catch (e) {
                    console.error(`failed to load data from address ${address}`);
                    console.error(e);
                }
            });
        } finally {
            setTimeout(() => this.pollForChanges(), pollDelay);
        }
    }
}
