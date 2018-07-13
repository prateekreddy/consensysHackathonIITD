const express = require('express');
const router = express.Router();
const carrierauthenticateOTP = require('./carrier.authenticateOTP');
const carrierSubmitPortRequest = require('./carrier.submitPortRequest');
const carrierGetCarrierOnboard = require('./carrier.getCarrierOnboard');

router.post('/submitOTP',(req, res)=>{
   try{
     await userAuth = carrierauthenticateOTP.authenticateOTP(req);
          console.log(userAuth);
          res.send(userAuth);
   }
   catch(e) {
     res.status(200).send({success: false, message : "Internal Server Error.."});
   }
});

router.post('/submitRequest',(req, res)=>{
    try {
        await userdata = carrierSubmitPortRequest.submitPortRequest(req);
        res.status(200).send({success : true , userdata});
    } catch (e) {
      res.status(200).send({success: false, message : "Internal Server Error.."});
    }
});

router.post('/carrierOnboard' ,(req,res) => {
  try {
      await onboard = carrierGetCarrierOnboard.getCarrierOnboard(req);
      res.status(200).send({success : true, onboard});
  } catch (e) {
    res.status(200).send({success : false, message : "Internal server Error.."});
  }
});

module.export = router;
