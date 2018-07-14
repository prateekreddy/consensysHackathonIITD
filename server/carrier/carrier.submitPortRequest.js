const rlp = require('rlp');
const PortRequest = require('../models/portRequest');
const web3 = require('./carrierController');
const onBoardConfig = require('../contracts/OnBoardCarrier');
const carrierConfig = require('../contracts/Carrier');

async function getOnBoarder() {
  const networkId = await web3.eth.net.getId();
  const onBoarder = new web3.eth.Contract(onBoardConfig.abi, onBoardConfig.networks[networkId].address);
  return onBoarder;
}

const onBoarder = getOnBoarder();

const getCarrierAddress = async (carrierId) => {
  const encodedId = rlp.encode(carrierId);
  const carrierAddress = await onBoarder.methods.carrierIdMap(carrierId).call(encodedId);
  console.log(carrierAddress);
  return carrierAddress;
};

const submitPortRequest = async function(req)
{
    try {
      const promise = new Promise((resolve, reject) => {
        console.log("Blockchain call with account :>> ", web3.eth.accounts[0]);
        web3.personal.unlockAccount(web3.eth.accounts[0], "", 0);
        // let addressCARRIER = variables.carrier1.CARRIERAddress;
        // let Contract = web3.eth.contract(JSON.parse(variables.carrier1.CARRIERAddress));
        // let contract = Contract.at(addressCARRIER);
        let mobileHash = web3.utils.toHex(req.body.mobile);
        const fromCarrierAddress = getCarrierAddress(req.body.fromCarrierAddress);
        const toCarrierAddress = getCarrierAddress(req.body.toCarrierAddress);
        const toCarrierContract = new web3.eth.Contract(carrierConfig.abi, toCarrierAddress);
        toCarrierContract.creatPortRequest.sendTransaction(fromCarrierAddress, toCarrierAddress, rlp.encode(req.body.toCountry), rlp.encode(''), mobileHash,{
          from: web3.eth.accounts[0],
          gas: 9987650
        }, function(error, res) {
          if(error)
          {
            reject({message : 'Some error while salving the data to the blockchain'});
          }
          else {
            const newPortRequest = new PortRequest(req);
            newPortRequest.save((err, data)=>{
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
  submitPortRequest : submitPortRequest
}
