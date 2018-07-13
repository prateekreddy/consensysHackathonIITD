pragma solidity 0.4.24;

import "./Port.sol";

contract Carrier {

    string public carrierId;
    string public carrierName;
    mapping(bytes32 => bytes32[]) public circlesByCountry;
    mapping(bytes32 => mapping(bytes32 => bool)) public isCircleExists;
    bytes32[] public countries;

    address public admin;

    modifier onlyAdmin {
        require(msg.sender == admin, "Sender is not the admin of Carrier.");
        _;
    }

    // to be implemented
    modifier onlyCountryAdmin {
        _;
    }

    event PortRequestCreated(address indexed _fromCarrier, address indexed _toCarrier, bytes32 indexed _hashedMobileNo, address _portAddress);

    constructor(string _carrierId, string _carrierName) public {
        carrierId = _carrierId;
        carrierName = _carrierName;
    }

    function createPortRequest(address _fromCarrier, address _toCarrier, bytes32 _hashedMobileNo) public {
        address port = new Port(_fromCarrier, _toCarrier, _hashedMobileNo);
        emit PortRequestCreated(_fromCarrier, _toCarrier, _hashedMobileNo, port);
    }

    function addCountry(bytes32 _country, bytes32[] _circles) public onlyAdmin {
        countries.push(_country);
        circlesByCountry[_country] = _circles;
        // mapping(bytes32 => bool) countryCircles;
        for(uint i = 0; i < _circles.length; i++) {
            isCircleExists[_country][_circles[i]] = true;
        }
    }

    function addCircle(bytes32 _country, bytes32 _circle) public onlyAdmin {
        isCircleExists[_country][_circle] = true;
        circlesByCountry[_country].push(_circle);
    }

    function acceptPortRequest(address _port) public {
        Port(_port).fromCarrierAccept();
    }

    function rejectPortRequest(address _port) public {
        Port(_port).fromCarrierReject();
    }

    function portCompleted(address _port) public {
        Port(_port).portCompleted();
    }
}