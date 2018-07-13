pragma solidity 0.4.24;

import "./Carrier.sol";

contract OnBoardCarrier {
    mapping(string => address) carrierIdMap;
    address admin;

    constructor(address _admin) public {
        admin = _admin;
    }

    function addCarrier(string _carrierId, string _carrierName) public {
        address carrier = new Carrier(_carrierId, _carrierName);
        carrierIdMap[_carrierId] = carrier;
    }
}