const WEB3_PROVIDER = 'https://ropsten.infura.io/';
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER));

process.stdin.resume();

let Contract = window.CurriculumContract;

// let myContract = Contract.at(data.contractAddress);
// let contractFields = ['budget', 'budgetUsed', 'description', 'maintainer', 'title', 'validationMethod'];
// let responsesWanted = contractFields.length;

// contractFields.forEach((key) => {
//     myContract[key]((err, value) => {
//         if (err) { alert(err); }
//         data[key] = value;
//         responsesWanted--;
//         if (responsesWanted === 0) {
//             dispatch(curriculumInfoLoaded(data));
//         }
//     });
// });

// window.curriculumContractCompiled = ${ JSON.stringify(CurriculumContract.contractCompiled) };
// window.learnerContractCompiled = ${ JSON.stringify(LearnerContract.contractCompiled) };
// window.pNGTokenCompiled = ${ JSON.stringify(PNGToken.contractCompiled) };
// function loadContracts() {
//     window.CurriculumContract = web3.eth.contract(JSON.parse(curriculumContractCompiled.interface));
//     window.LearnerContract = web3.eth.contract(JSON.parse(learnerContractCompiled.interface));
//     window.PNGToken = web3.eth.contract(JSON.parse(pNGTokenCompiled.interface));
// }
// if (window.web3) {
//     loadContracts();
// } else {
//     setTimeout(loadContracts, 100);
// }

// const solc = require('solc');
// let contractCompiled = solc.compile({
//     sources: {
//         'CurriculumContractSource.sol': CurriculumContractSource,
//         'LearnerContract.sol': LearnerContractSource,
//         'PNGToken.sol': PNGTokenSource
//     }
// }, 1).contracts['CurriculumContractSource.sol:CurriculumContract'];
