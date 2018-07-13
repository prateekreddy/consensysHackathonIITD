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
}

module.exports = {
  web3 : web3
}
