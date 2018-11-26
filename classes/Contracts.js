const Web3 = require('web3');
const BoxContract = require('./BoxContract');

const WEB3_PROVIDER = 'https://ropsten.infura.io/';

module.exports = class Contracts {
    constructor(web3, initialContracts) {
        this.collection = initialContracts || [];
        this.web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER));
    }

    get(name) {
        return this.collection[name];
    }

    addNameFromInterface(name, interfaceJson) {
        if (!this.collection[name]) {
            this.collection[name] = new BoxContract(this.web3.eth.contract(interfaceJson));
        }
        return this.collection[name];
    }

    addNameFromFile(name, filePath) {
        const BoxCompiledContract = require(filePath);
        this.collection[name] = this.addNameFromInterface(name, JSON.parse(BoxCompiledContract.interface));
    }
}
