const PortRequest = require('../models/portRequest');
const web3 = require('carrierController');

const submitPortRequest = async function(req)
{
    try {
      const promise = new Promise((resolve, reject) => {
        console.log("Blockchain call with account :>> ", web3.eth.accounts[0]);
        web3.personal.unlockAccount(web3.eth.accounts[0], "", 0);
        let addressCARRIER = variables.carrier1.CARRIERAddress;
        let Contract = web3.eth.contract(JSON.parse(variables.carrier1.CARRIERAddress));
        let contract = Contract.at(addressCARRIER);
        let mobileHash = web3.utils.toHex(req.body.mobile);
        contract.creatPortRequest.sendTransaction(req.body.carrierAddress, req.body.mobileHash,{
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
