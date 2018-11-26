const {promisify} = require('util');

const contracts = {};

class BlahObjectStorage {
    constructor(contract, contractAddress) {
        this.contract = contract.at(contractAddress);
        this.contractAddress = contractAddress;
    }

    getValue(key) {
        const getValue = this.contract[key];
        return getValue && promisify(getValue.bind(this.contract))();
    }

    getValues(keys) {
        const values = keys.map((key) => this.getValue(key));

        return Promise.all(values)
            .then((values) => {
                return keys.reduce((accumulator, key) => {
                    accumulator[key] = values[Object.keys(accumulator).length];
                    return accumulator;
                }, {})
            });
    }
}

module.exports = class BoxContract {
    constructor(contract) {
        this.contract = contract;
    }

    at(contractAddress) {
        if (!contracts[contractAddress]) {
            contracts[contractAddress] = new BlahObjectStorage(this.contract, contractAddress)
        }

        return contracts[contractAddress];
    }
}
