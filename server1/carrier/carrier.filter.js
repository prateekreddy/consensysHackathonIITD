const rlp = require('rlp');
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

function byNumber(req, callback) {
    const phNo = req.query.phNo;
    let phoneTopic = web3.utils.padLeft(web3.utils.numberToHex(phNo), 64);
    console.log(phoneTopic);
    web3.eth.getPastLogs({
        topics: ["0x718b043b14544f95d1313302fec12ded4a6ec691f49ffd762c267be722c784c8", null, null, phoneTopic]
    }).then((logs) => {
        let ports = [];
        for(let i=0; i < logs.length; i++) {
            var log = logs[i];
            ports.push({
                fromCarrier: log.topics[1],
                toCarrier: log.topics[2],
                phoneNumber: phNo
            });
        }
        callback(null, ports)
    });
}

async function byCarrier(req, callback) {
    const carrierId = req.query.carrierId;
    const carrierTopic = web3.utils.padLeft(carrier)
}

module.exports = {
    byNumber
}