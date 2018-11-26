const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const ContractDeamon = require('./classes/ContractDeamon');
const Contracts = require('./classes/Contracts');
const contracts = new Contracts();

contracts.addNameFromFile('box', `${__dirname}/smartcontracts/Box.compiled.json`);

const CONTRACT_ADDRESS = '0xc789bc784db54ef91a0d3e051986f61e3367a57a';
// const NODE_PRIVATE_KEY = '588bab92cce6d95af7207b248f799907849e86dbe00f27a6870aa6a47430b5ed';
// const NODE_PUBLIC_KEY = '0xA7387feCcA51130A0F117C9cEec18287390E2bF2';

const deamon = new ContractDeamon(contracts);

deamon.watch(CONTRACT_ADDRESS).on('data', (rawData) => {
    const data = JSON.parse(JSON.stringify(rawData));
    console.log(data);
});

// function triggerServo(action) {
//     if (['open', 'close'].indexOf(action) === -1) {
//         return Promise.reject('please send valid action');
//     }

//     return new Promise((resolve, reject) => {
//         exec(`python /home/pi/servosix/python/examples/${action}.py`, (err, stdout, stderr) => {
//             if (err) { return reject(err); }
//             if (stderr) { return reject(stderr); }

//             return resolve(stdout);
//         });
//     });
// }

// deamon.addAction('triggerServo', triggerServo);

deamon.start();
