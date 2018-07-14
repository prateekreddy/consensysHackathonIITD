pragma solidity 0.4.24;

contract Port {
    address fromCarrier;
    address toCarrier;
    bytes32 toCountry;
    bytes32 toCircle;
    string portStatus;

    uint hashedMobileNumber;

    event FromCarrierAccepted(address fromCarrier);
    event FromCarrierRejected(address fromCarrier);
    event PortCompleted(address toCarrier);

    modifier onlyFromCarrier {
        require(msg.sender == fromCarrier, "sender is not the from carrier");
        _;
    }

    modifier onlyToCarrier {
        require(msg.sender == toCarrier, "sender is not the to carrier");
        _;
    }

    constructor(address _fromCarrier, address _toCarrier, bytes32 toCountry, bytes32 toCircle, uint _hashedMobileNumber) public {
        fromCarrier = _fromCarrier;
        toCarrier = _toCarrier;
        hashedMobileNumber = _hashedMobileNumber;
    }

    function fromCarrierAccept() public {
        portStatus = "accepted";
        emit FromCarrierAccepted(msg.sender);
    }

    function fromCarrierReject() public {
        portStatus = "rejected";
        emit FromCarrierRejected(msg.sender);
    }

    function portCompleted() public {
        portStatus = "completed";
        emit PortCompleted(msg.sender);
    }
}