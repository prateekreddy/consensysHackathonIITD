const LocationHistory = require('../models/LocationHistory');
const PortRequest = require('../models/portRequest');
const CarrierOnboard = require('../models/carrierOnboard');
const PortRequest = require('../models/portRequest')
const variables = require('../../config/config');
const Web3 = require('web3');
EthIP = variables.blockchainConfig.host_rpc_ip;
EthRPCPort = variables.blockchainConfig.host_rpc_port;
console.log("EthRPCPort :", EthRPCPort);
if (EthIP == null || EthIP.length === 0) {
    EthIP = "0.0.0.0";
}
if (EthRPCPort == null || EthRPCPort.length === 0) {
    EthRPCPort = "8080";
}
// web3.setProvider(new Web3.providers.HttpProvider("http://"+EthIP+":"+EthRPCPort));
console.log("EthIP :", EthIP);
console.log("EthRPCPort :", EthRPCPort);
try {
    var web3 = new Web3(new Web3.providers.HttpProvider("http://" + EthIP + ":" + EthRPCPort));

} catch (e) {
    console.log(e);
} finally {
    //console.log("could not connect to Blockchain");
}

const authenticateOTP = async function(req)
{
  try {
  const promise = new Promise((resolve, reject) => {
    setTimeout(function () {
      if(isNaN(req.otp))
      {
        reject({message : "Invalid OTP. Please try again"})
      }
      else {
        resolve({message : "success"})
      }
    console.log('timeout completed');
}, 1000);
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



const getLocationHistories = function(req){
  try {
    const promise = new Promise(function(resolve,reject){
      LocationHistory.find({
        user_email : req.user.email
      },function(err,locations){
        if(err){
          reject({message : 'Some error occured, could not fetch history'});
        }
        if(!locations){
          reject({message : 'Some error occured, could not fetch history'});
        }else{
          resolve(locations);
        }
      });
    });
    return promise;
  } catch (e) {
    const promise = new Promise(function(resolve, reject) {
      reject({message : 'Some error occured, could not fetch history'});
    });
    return promise;
  }
}
const addLocation = function(req){
  try {
    const promise = new Promise(function(resolve,reject){
      const location = req.body;
      location.user_email = req.user.email;
      const newLocation = new LocationHistory(location);
      newLocation.save(function(err,location){
        if(err){
          console.log(err);
          reject(err);
        }
        if(!location){
          reject({message : 'Some error occured, could not save location'});
        }else{
          resolve(location);
        }
      })
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

const updateLocation = function(req){
  try {
    const promise = new Promise(function(resolve,reject){
      const location = req.body;
      LocationHistory.findOne({
        _id : location._id,
        user_email : req.user.email
      },function(err,locationFound){
        if(err){
          reject(err);
        }
        if(!locationFound){
          reject({message : 'Location not found'});
        }else{
          locationFound.location_tag = location.location_tag;
          locationFound.save(function(err,savedLocation){
            if(err){
              reject(err);
            }
            if(!savedLocation){
              reject({message : 'Internal Server Error..'})
            }else {
              resolve(savedLocation);
            }
          })
        }
      });
    });
    return promise;
  } catch (e) {
    const promise = new Promise(function(resolve, reject) {
      reject(e);
    });
    return promise;
  }
}

const deleteLocation = function(req){
  try {
    const promise = new Promise(function(resolve,reject){
      const location = req.body;
      LocationHistory.findOne({
        _id : location._id,
        user_email : req.user.email
      },function(err,locationFound){
        if(err){
          reject(err);
        }
        if(!locationFound){
          reject({message : 'Location not found'});
        }else{

          LocationHistory.remove({_id : locationFound._id},function(err){
            if(err){
              reject(err);
            }else {
              resolve({message : 'Successfully removed location..'});
            }
          })
        }
      });
    });
    return promise;
  } catch (e) {
    const promise = new Promise(function(resolve, reject) {
      reject(e);
    });
    return promise;
  }
}
module.exports = {
  addLocation : addLocation,
  getLocationHistories : getLocationHistories,
  updateLocation : updateLocation,
  deleteLocation : deleteLocation
}
