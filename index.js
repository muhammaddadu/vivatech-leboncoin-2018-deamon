const fs = require('fs');
const path = require('path');
const async = require('async');
const WEB3_PROVIDER = 'https://ropsten.infura.io/';
const CONTRACT_ADDRESS = '0xc789bc784db54ef91a0d3e051986f61e3367a57a';
const NODE_PRIVATE_KEY = '588bab92cce6d95af7207b248f799907849e86dbe00f27a6870aa6a47430b5ed';
const NODE_PUBLIC_KEY = '0xA7387feCcA51130A0F117C9cEec18287390E2bF2';

const piblaster = require('pi-blaster.js');

// const solc = require('solc');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER));

// const BoxSource = fs.readFileSync(path.join(__dirname, 'smartcontracts/Box.sol'), 'utf8');
// const BoxCompiled = solc.compile({
//     sources: {
//         'BoxSource.sol': BoxSource
//     }
// }, 1).contracts['BoxSource.sol:Box'];
const BoxCompiled = require('./smartcontracts/Box.compiled.json');
const Contract = web3.eth.contract(JSON.parse(BoxCompiled.interface));

const myContract = Contract.at(CONTRACT_ADDRESS);

fs.writeFileSync(path.join(__dirname, 'smartcontracts/Box.compiled.json'), JSON.stringify(BoxCompiled));

var shouldRun = true;

function watchContractAtAddress() {
    let contractFields = ['owner', 'pricePerDay', 'lat', 'long', 'productContract', 'getStatus'];
    let responsesWanted = contractFields.length;

    let _data = {};

    async.forEach(contractFields, (key, done) => {
        myContract[key]((err, value) => {
            if (err) {
                console.error(err);
            }

            _data[key] = value;
            done();
        });
    }, function () {
        setTimeout(() => {
            watchContractAtAddress();
        }, 1000);

        let data = JSON.parse(JSON.stringify(_data));
        console.log(data);

        switch (data.getStatus) {
            case '0': // AVAILABLE
            case '2': // UNLOCKED
                piblaster.setPwm(17, 0.05);
                break;
            case '1': // Locked
                piblaster.setPwm(17, 0.145);
                break;
        }

        shouldRun = true;
    });
}

setInterval(() => {
    if (shouldRun) {
        shouldRun = false;
        watchContractAtAddress();
    }
}, 2000);

process.stdin.resume();