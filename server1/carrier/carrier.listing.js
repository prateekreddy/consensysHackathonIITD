const rlp = require('rlp');
const web3 = require('./carrierController').web3;
const onBoardConfig = require('../contracts/OnBoardCarrier');
const carrierConfig = require('../contracts/Carrier');
function getOnBoarder(callback) {
  const networkId = web3.eth.net.getId().then((networkId) => {
		// console.log(networkId);
		const onBoarder = new web3.eth.Contract(onBoardConfig.abi, onBoardConfig.networks[networkId].address);
		// console.log(onBoarder, onBoarder.methods)
		callback(onBoarder);
	});
}

async function getAccounts() {
	let acc = await web3.eth.getAccounts();
	return acc;
}

let onBoarder, accounts;
getOnBoarder((_onBoarder) => {
	onBoarder = _onBoarder;
});
getAccounts().then((_accounts) => {
	accounts = _accounts;
});

const getCarrierAddress = async (carrierId) => {
    const encodedId = "0x"+rlp.encode(carrierId).toString('hex');
    const carrierAddress = await onBoarder.methods.carrierIdMap(encodedId).call();
    // console.log(carrierAddress);
    return carrierAddress;
};

// function getCarriers(req, callback) {
//     const carrierId = req.query.carrierId;
//     const country = req.query.country;
//     const carrierAddress = await getCarrierAddress(carrierId);

//     const carrierContract = new web3.eth.Contract(carrierConfig.abi, carrierAddress);
//     carrierContract.methods.get().call((err, countries) => {
//         console.log(err, countries);
//         callback(err, countries);
//     });
// }

async function getCountries(req, callback) {
    const carrierId = req.query.carrierId;
    const carrierAddress = await getCarrierAddress(carrierId);

    const carrierContract = new web3.eth.Contract(carrierConfig.abi, carrierAddress);
    carrierContract.methods.getCountries().call((err, countries) => {
        console.log(err, countries);
        callback(err, countries);
    });
}

module.exports = {
    // getCarriers,
    getCountries
}