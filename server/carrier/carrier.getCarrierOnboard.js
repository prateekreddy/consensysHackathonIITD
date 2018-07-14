const rlp = require('rlp');
const CarrierOnboard = require('../models/carrierOnboard');
const web3 = require('./carrierController');
const onBoardConfig = require('../contracts/OnBoardCarrier');

async function getOnBoarder() {
  const networkId = await web3.eth.net.getId();
  const onBoarder = new web3.eth.Contract(onBoardConfig.abi, onBoardConfig.networks[networkId].address);
  return onBoarder;
}

const onBoarder = getOnBoarder();

const getCarrierOnboard = function(req) {
	console.log("req body >>>> ",req.body)
  try {
    const promise = new Promise((resolve, reject)=>{
			console.log("Blockchain call with account :>> ", web3.eth.accounts[0]);
			web3.personal.unlockAccount(web3.eth.accounts[0], "", 0);
			onBoarder.methods.addCarrier(rlp.encode(req.body.carrierId), req.body.carrierName).send({
				from: web3.eth.accounts[0],
				gas: 9987650
			}, function(error, res) {
				if(error)
				{
				reject({message : 'Some error while salving the data to the blockchain'});
				}
				else {
				const newCarrierOnboard = new CarrierOnboard(req);
				newCarrierOnboard.save((err, data)=>{
					if(err)
					{
					reject({message : 'Some error while salving the data'});
					}
					resolve(date);
				})
				}
			});
    });
    return promise;
  } catch (e) {
		console.log(e);
		const promise = new Promise(function(resolve, reject) {
			reject(e);
		});
		return promise;
	}
}

module.exports = {
  getCarrierOnboard : getCarrierOnboard
}
