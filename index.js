const fs = require('fs');
const path = require('path');
const WEB3_PROVIDER = 'https://ropsten.infura.io/';
const CONTRACT_ADDRESS = '0xc164c61a94ed91d56f2f63c0dc870bad923399b5';
const NODE_PRIVATE_KEY = '588bab92cce6d95af7207b248f799907849e86dbe00f27a6870aa6a47430b5ed';
const NODE_PUBLIC_KEY = '0xA7387feCcA51130A0F117C9cEec18287390E2bF2';

const solc = require('solc');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER));

const BoxSource = fs.readFileSync(path.join(__dirname, 'smartcontracts/Box.sol'), 'utf8');
const BoxCompiled = solc.compile({
    sources: {
        'BoxSource.sol': BoxSource
    }
}, 1).contracts['BoxSource.sol:Box'];
const Contract = web3.eth.contract(JSON.parse(BoxCompiled.interface));

fs.writeFileSync(path.join(__dirname, 'smartcontracts/Box.compiled.json'), JSON.stringify(BoxCompiled));

function watchContractAtAddress(contractAddress) {
    let myContract = Contract.at(contractAddress);
    let contractFields = ['owner', 'pricePerDay', 'lat', 'long', 'productContract', 'getStatus'];
    let responsesWanted = contractFields.length;

    let data = {};

    console.log(Object.keys(myContract));

    contractFields.forEach((key) => {
        console.log(key);
        myContract[key]((err, value) => {
            if (err) {
                alert(err);
            }

            data[key] = value;
            responsesWanted--;
        });
    });

    console.log(data);
}

watchContractAtAddress(CONTRACT_ADDRESS);

process.stdin.resume();