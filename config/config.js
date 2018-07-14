

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
  host_rpc_ip: 'localhost',
  host_rpc_port: '8545'
}

let carrier = {
  abi:
'[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"countries","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"carrierId","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"name":"circlesByCountry","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32"}],"name":"isCircleExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"carrierName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_carrierId","type":"string"},{"name":"_carrierName","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_fromCarrier","type":"address"},{"indexed":true,"name":"_toCarrier","type":"address"},{"indexed":true,"name":"_hashedMobileNo","type":"bytes32"},{"indexed":false,"name":"_portAddress","type":"address"}],"name":"PortRequestCreated","type":"event"},{"constant":false,"inputs":[{"name":"_fromCarrier","type":"address"},{"name":"_toCarrier","type":"address"},{"name":"_hashedMobileNo","type":"bytes32"}],"name":"createPortRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_country","type":"bytes32"},{"name":"_circles","type":"bytes32[]"}],"name":"addCountry","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_country","type":"bytes32"},{"name":"_circle","type":"bytes32"}],"name":"addCircle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_port","type":"address"}],"name":"acceptPortRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_port","type":"address"}],"name":"rejectPortRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_port","type":"address"}],"name":"portCompleted","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]',
// address: "0xa5cb82474ee5569e60cdf4ac8022ea60819460db",
}

let onBoarder = {
  abi: '[{"inputs":[{"name":"_admin","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"name":"_carrierId","type":"string"},{"name":"_carrierName","type":"string"}],"name":"addCarrier","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]',
  address: '0xcfeb869f69431e42cdb54a4f4f105c19c080a601'
}


module.exports = {
  mongoConfig : mongoConfig,
  jwtConfig : jwtConfig,
  blockchainConfig : blockchainConfig,
  carrier,
  onBoarder
}
