pragma solidity 0.4.24;

contract Port {
    address fromCarrier;
    address toCarrier;
    bytes32 toCountry;
    bytes32 toCircle;
    string portStatus;

    bytes32 hashedMobileNumber;

    modifier onlyFromCarrier {
        require(msg.sender == fromCarrier, "sender is not the from carrier");
        _;
    }

    modifier onlyToCarrier {
        require(msg.sender == toCarrier, "sender is not the to carrier");
        _;
    }

    constructor(address _fromCarrier, address _toCarrier, bytes32 toCountry, bytes32 toCircle, bytes32 _hashedMobileNumber) public {
        fromCarrier = _fromCarrier;
        toCarrier = _toCarrier;
        hashedMobileNumber = _hashedMobileNumber;
    }

    function fromCarrierAccept() public {
        portStatus = "accepted";
    }

    function fromCarrierReject() public {
        portStatus = "rejected";
    }

    function portCompleted() public {
        portStatus = "completed";
    }
}