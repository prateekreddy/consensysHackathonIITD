const rlp = require('rlp');
const CarrierOnboard = require('../models/carrierOnboard');
const web3 = require('./carrierController').web3;
const onBoardConfig = require('../contracts/OnBoardCarrier');

async function getOnBoarder() {
  const networkId = await web3.eth.net.getId();
  const onBoarder = new web3.eth.Contract(onBoardConfig.abi, onBoardConfig.networks[networkId].address);
  return onBoarder;
}

const onBoarder = getOnBoarder();

const getCarrierOnboard = function(req, callback) {
	console.log(req.body)
  try {
		console.log("Blockchain call with account :>> ", web3.eth.accounts[0]);
		onBoarder.methods.addCarrier(rlp.encode(req.body.carrierId), req.body.carrierName).send({
			from: web3.eth.accounts[0],
			gas: 9987650
		}, function(error, res) {
			if(error)
			{
				console.log("blockchain error")
				callback(null, {message : 'Some error while salving the data to the blockchain'});
			}
			else {
			const newCarrierOnboard = new CarrierOnboard(req);
			newCarrierOnboard.save((err, data)=>{
				if(err)
				{
					console.log("db error")
				callback({message : 'Some error while salving the data'}, null);
				}
				callback(null, data);
			})
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
