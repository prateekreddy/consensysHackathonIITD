const express = require('express');
const router = express.Router();
const carrierauthenticateOTP = require('./carrier.authenticateOTP');
const carrierSubmitPortRequest = require('./carrier.submitPortRequest');
const carrierGetCarrierOnboard = require('./carrier.getCarrierOnboard');

router.post('/submitOTP', (req, res)=>{
   try{
      carrierauthenticateOTP.authenticateOTP(req).then((userAuth) => {
        console.log(userAuth);
        res.send(userAuth);
      });
   }
   catch(e) {
     res.status(200).send({success: false, message : "Internal Server Error.."});
   }
});

// body contains
// * mobile
// * fromCarrierAddress
// * toCarrierAddress
// * toCountry
router.post('/submitRequest',(req, res)=>{
    try {
        carrierSubmitPortRequest.submitPortRequest(req).then((userData) => {
          res.status(200).send({success : true , userData});
        });
    } catch (e) {
      res.status(200).send({success: false, message : "Internal Server Error.."});
    }
});

// * carrierId
// * carrierName
router.post('/carrierOnboard' ,(req,res) => {
  try {
      carrierGetCarrierOnboard.getCarrierOnboard(req).then((onboard) => {
        res.status(200).send({success : true, onboard});
      });
  } catch (e) {
    res.status(200).send({success : false, message : "Internal server Error.."});
  }
});

module.exports = router;
