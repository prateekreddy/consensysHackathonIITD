pragma solidity 0.4.24;

import "./Carrier.sol";

contract OnBoardCarrier {
    mapping(bytes32 => address) public carrierIdMap;
    address admin;

    constructor(address _admin) public {
        admin = _admin;
    }

    event CarrierAdded(bytes32 indexed _carrierId, string _carrierName, address indexed carrier);

    function addCarrier(bytes32 _carrierId, string _carrierName) public {
        address carrier = new Carrier(_carrierId, _carrierName);
        carrierIdMap[_carrierId] = carrier;
        emit CarrierAdded(_carrierId, _carrierName, carrier);
    }
}