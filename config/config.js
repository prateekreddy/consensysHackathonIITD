let serviceCredentials = {
  mongodb : {
    username : '',
    password : ''
  }
}

let mongoConfig = {
  connectionURL : 'mongodb://localhost:27017/sourav_storage',
  connectionURL1 : 'mongodb://username:password@ds131137.mlab.com:31137/sourav_storage'
}

let jwtConfig = {
  secret : 'locfin'
}

let googleLocation = {
  key : '',
}

let blockchainConfig = {
  host_rpc_ip: '10.184.194.186',
  host_rpc_port: '8545'
}

let carrier1 = {
  CARRIERABI:
'[{"constant":false,"inputs":[{"name":"finishedGoodId","type":"bytes32"}],"name":"emitFGEvent1","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"finishedGoodId","type":"bytes32"}],"name":"getFinishedGoodByIdPart2","outputs":[{"name":"prescribedTempRange","type":"string"},{"name":"shipmentIdP2R","type":"bytes32"},{"name":"shipmentIdR2C","type":"bytes32"},{"name":"shipmentIdC2W","type":"bytes32"},{"name":"locationStatus","type":"uint256"},{"name":"operationStatus","type":"uint256"},{"name":"complianceStatus","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"finishedGoodListToBeUpdated","type":"bytes32[]"},{"name":"ShipmentId","type":"bytes32"}],"name":"updateShipmentR2C","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"finishedGoodListToBeUpdated","type":"bytes32[]"},{"name":"ShipmentId","type":"bytes32"}],"name":"updateShipmentC2W","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"finishedGoodId","type":"bytes32"}],"name":"emitEvents","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"finishedGoodId","type":"bytes32"}],"name":"emitFGEvent2","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"finishedGoodId","type":"bytes32"},{"name":"date","type":"uint256"},{"name":"coaDocEn","type":"string"},{"name":"cocDocEn","type":"string"},{"name":"locationStatus","type":"uint256"},{"name":"operationStatus","type":"uint256"},{"name":"complianceStatus","type":"uint256"}],"name":"createFinishedGood","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"finishedGoodListToBeUpdated","type":"bytes32[]"},{"name":"ShipmentId","type":"bytes32"}],"name":"updateShipmentP2R","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"finishedGoodId","type":"bytes32"}],"name":"getFinishedGoodByIdPart1","outputs":[{"name":"dateOfCreation","type":"uint256"},{"name":"dateOfLastUpdate","type":"uint256"},{"name":"cocDocEn","type":"string"},{"name":"dateCocEnUpload","type":"uint256"},{"name":"cocDocRu","type":"string"},{"name":"dateCocRuUpload","type":"uint256"},{"name":"coaDocEn","type":"string"},{"name":"dateCoaEnUpload","type":"uint256"},{"name":"coaDocRu","type":"string"},{"name":"dateCoaRuUpload","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"finishedGoodId","type":"bytes32"},{"name":"date","type":"uint256"},{"name":"coaDocEn","type":"string"},{"name":"coaDocRu","type":"string"},{"name":"cocDocEn","type":"string"},{"name":"cocDocRu","type":"string"},{"name":"prescribedTempRange","type":"string"},{"name":"ShipmentIdP2R","type":"bytes32"},{"name":"ShipmentIdR2C","type":"bytes32"},{"name":"ShipmentIdC2W","type":"bytes32"},{"name":"locationStatus","type":"uint256"},{"name":"operationStatus","type":"uint256"},{"name":"complianceStatus","type":"uint256"}],"name":"updateFinishedGood","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"finishedGoodId","type":"bytes32"},{"indexed":false,"name":"dateOfCreation","type":"uint256"},{"indexed":false,"name":"DateOfLastUpdate","type":"uint256"},{"indexed":false,"name":"coaDocEn","type":"string"},{"indexed":false,"name":"coaDocRu","type":"string"},{"indexed":false,"name":"cocDocEn","type":"string"},{"indexed":false,"name":"cocDocRu","type":"string"},{"indexed":false,"name":"blockTimestamp","type":"uint256"}],"name":"FinishedGoodEvent1","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"finishedGoodId","type":"bytes32"},{"indexed":false,"name":"prescribedTempRange","type":"string"},{"indexed":false,"name":"shipmentIdP2R","type":"bytes32"},{"indexed":false,"name":"shipmentIdR2C","type":"bytes32"},{"indexed":false,"name":"shipmentIdC2W","type":"bytes32"},{"indexed":false,"name":"Status","type":"uint256"},{"indexed":false,"name":"blockTimestamp","type":"uint256"}],"name":"FinishedGoodEvent2","type":"event"}]',
CARRIERAddress: "0xa5cb82474ee5569e60cdf4ac8022ea60819460db",
}

module.exports = {
  mongoConfig : mongoConfig,
  jwtConfig : jwtConfig,
  blockchainConfig : blockchainConfig,
  carrier1 : carrier1
}
