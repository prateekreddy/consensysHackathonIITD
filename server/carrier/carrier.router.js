const express = require('express');
const router = express.Router();
const carrierauthenticateOTP = require('./carrier.authenticateOTP');
const carrierSubmitPortRequest = require('./carrier.submitPortRequest');
const carrierGetCarrierOnboard = require('./carrier.getCarrierOnboard');
const carrierAuthenticate = require('./carrier.carrierAuthenticate');

router.post('/submitOTP', (req, res)=>{
   try{
     console.log("inside submit OTP");
      carrierauthenticateOTP.authenticateOTP(req ,(err, data) => {
        console.log(data);
        if(err)
        {
          res.status(200).send({success: false, message : "Internal Server Error.."});
        }
        res.status(200).send({success : true, data});
      });
   }
   catch(e) {
     res.status(200).send({success: false, message : "Internal Server Error.."});
   }
});

router.post('/authenticateCarrier', (req,res)=>{
  try {
      carrierAuthenticate.checkCarrierAuth(req,(err, data)=>{
        if(err)
        {
          res.status(200).send({success: false, message : "Internal Server Error.."});
        }
        else {
          res.status(200).send({success : true, data});
        }
      });
  } catch (e) {
    res.status(200).send({success: false, message : "Internal Server Error.."});
  }
})

router.post('/submitRequest',(req, res)=>{
    try {
        carrierSubmitPortRequest.submitPortRequest(req).then((userData) => {
          res.status(200).send({success : true , userData});
        }).catch(console.log);
    } catch (e) {
      res.status(200).send({success: false, message : "Internal Server Error.."});
    }
});

router.post('/carrierOnboard' ,(req,res) => {
  try {
      carrierGetCarrierOnboard.getCarrierOnboard(req, (err, onboard) => {
        if(!err) {
          res.status(200).send({success : true, onboard});
        } else {
          res.status(200).send({success : false, message : "Internal server Error.."});
        }
      })
  } catch (e) {
    res.status(200).send({success : false, message : "Internal server Error.."});
  }
});

module.exports = router;
