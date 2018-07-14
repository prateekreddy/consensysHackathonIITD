const rlp = require('rlp');
const PortRequest = require('../models/portRequest');
const web3 = require('./carrierController').web3;
const onBoardConfig = require('../contracts/OnBoardCarrier');
const carrierConfig = require('../contracts/Carrier');
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

const getCarrierAddress = async (carrierId) => {
  const encodedId = "0x"+rlp.encode(carrierId).toString('hex');
  const carrierAddress = await onBoarder.methods.carrierIdMap(encodedId).call();
  console.log(carrierAddress);
  return carrierAddress;
};

const submitPortRequest = async function(req)
{
    try {
      const promise = new Promise(async (resolve, reject) => {
        // console.log("Blockchain call with account :>> ", web3.eth.accounts[0]);
        // web3.personal.unlockAccount(web3.eth.accounts[0], "", 0);
        // let addressCARRIER = variables.carrier1.CARRIERAddress;
        // let Contract = web3.eth.contract(JSON.parse(variables.carrier1.CARRIERAddress));
        // let contract = Contract.at(addressCARRIER);
        console.log(req.body);
        let mobileHash = req.body.mobile;
        const fromCarrierAddress = await getCarrierAddress(req.body.fromCarrierId);
        const toCarrierAddress = await getCarrierAddress(req.body.toCarrierId);
        const toCarrierContract = new web3.eth.Contract(carrierConfig.abi, toCarrierAddress);
        console.log(fromCarrierAddress, toCarrierAddress, "0x"+rlp.encode(req.body.toCountry).toString('hex'), "0x"+rlp.encode('').toString('hex'), mobileHash)
        toCarrierContract.methods.createPortRequest(fromCarrierAddress, toCarrierAddress, "0x"+rlp.encode(req.body.toCountry).toString('hex'), "0x"+rlp.encode('').toString('hex'), mobileHash).send({
          from: accounts[0],
          gas: 9987650
        }, function(error, res) {
          console.log(error, res);
          if(error)
          {
            reject({message : 'Some error while salving the data to the blockchain'});
          }
          else {
            resolve(true);
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
  submitPortRequest : submitPortRequest
}
