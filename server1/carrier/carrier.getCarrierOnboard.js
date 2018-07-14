const rlp = require('rlp');
const CarrierOnboard = require('../models/carrierOnboard');
const web3 = require('./carrierController').web3;
const onBoardConfig = require('../contracts/OnBoardCarrier');

function getOnBoarder(callback) {
  const networkId = web3.eth.net.getId().then((networkId) => {
		console.log(networkId);
		const onBoarder = new web3.eth.Contract(onBoardConfig.abi, onBoardConfig.networks[networkId].address);
		console.log(onBoarder, onBoarder.methods)
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

const getCarrierOnboard = function(req, callback) {
	console.log(req.body)
  try {
		// console.log("Blockchain call with account :>> ");
		console.log(onBoarder.methods)
		// console.log("0x"+rlp.encode(req.body.carrierId).toString('hex'))
		const encodedCarrierId = "0x"+rlp.encode(req.body.carrierId).toString('hex');
		onBoarder.methods.addCarrier(encodedCarrierId, req.body.carrierName).send({
			from: accounts[0],
			gas: 9987650
		}, function(error, res) {
			if(error)
			{
				console.log("blockchain error", error);
				callback(null, {message : 'Some error while salving the data to the blockchain'});
				return;
			}
			else {
			// const newCarrierOnboard = new CarrierOnboard(req);
			// newCarrierOnboard.save((err, data)=>{
			// 	if(err)
			// 	{
			// 		console.log("db error")
			// 	callback({message : 'Some error while salving the data'}, null);
			// 	return;
			// 	}
			// 	callback(null, data);return;
			// })
			callback(null, true)
			}
		});
  } catch (e) {
		console.log(e);
		callback(e, null);
	}
}

module.exports = {
  getCarrierOnboard : getCarrierOnboard
}
