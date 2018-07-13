var onBoarder = artifacts.require("./OnBoardCarrier.sol");

module.exports = function(deployer, network, accounts) {
//   deployer.deploy(Migrations);
    deployer.deploy(onBoarder, accounts[0]);
};
