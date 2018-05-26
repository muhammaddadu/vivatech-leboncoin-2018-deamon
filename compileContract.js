const fs = require('fs');
const path = require('path');
const solc = require('solc');

const BoxSource = fs.readFileSync(path.join(__dirname, 'smartcontracts/Box.sol'), 'utf8');
const BoxCompiled = solc.compile({
    sources: {
        'BoxSource.sol': BoxSource
    }
}, 1).contracts['BoxSource.sol:Box'];
fs.writeFileSync(path.join(__dirname, 'smartcontracts/Box.compiled.json'), JSON.stringify(BoxCompiled));

const ProductSource = fs.readFileSync(path.join(__dirname, 'smartcontracts/Product.sol'), 'utf8');
const ProductCompiled = solc.compile({
    sources: {
        'Contract.sol': ProductSource,
        'Box.sol': BoxSource
    }
}, 1).contracts;
fs.writeFileSync(path.join(__dirname, 'smartcontracts/Product.compiled.json'), JSON.stringify(ProductCompiled));
