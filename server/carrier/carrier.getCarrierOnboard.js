const CarrierOnboard = require('../models/carrierOnboard');
const web3 = require('carrierController');

const getCarrierOnboard = async function(req){
  try {
    const promise = new Promise((resolve, reject)=>{
      console.log("Blockchain call with account :>> ", web3.eth.accounts[0]);
      web3.personal.unlockAccount(web3.eth.accounts[0], "", 0);
      let addressCARRIER = variables.carrier1.CARRIERAddress;
      let Contract = web3.eth.contract(JSON.parse(variables.carrier1.CARRIERAddress));
      let contract = Contract.at(addressCARRIER);
      let mobileHash = web3.utils.toHex(req.body.mobile);
      contract.getCarrierOnBoard.sendTransaction(req.body.carrierAddress, req.body.mobileHash,{
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
    retrun promise;
  } catch (e) {
    console.log(e);
    const promise = new Promise(function(resolve, reject) {
      reject(e);
    }
}

module.exports = {
  getCarrierOnboard : getCarrierOnboard
}
