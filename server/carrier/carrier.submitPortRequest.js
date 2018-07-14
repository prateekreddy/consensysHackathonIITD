const rlp = require('rlp');
const PortRequest = require('../models/portRequest');
const web3 = require('./carrierController').web3;
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

const submitPortRequest = function(req, callback)
{
    try {
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
            callback(null,{message : 'Some error while salving the data to the blockchain'});
          }
          else {
            const newPortRequest = new PortRequest(req);
            newPortRequest.save((err, data)=>{
              if(err)
              {
                callback(null,{message : 'Some error while salving the data'});
              }
              callback(data);
            })
          }
        });
    } catch (e) {
      console.log(e);
      callback(e,null);
    }
}


module.exports = {
  submitPortRequest : submitPortRequest
}
