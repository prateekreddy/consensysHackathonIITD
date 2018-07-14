const express = require('express');
const router = express.Router();
const carrierauthenticateOTP = require('./carrier.authenticateOTP');
const carrierSubmitPortRequest = require('./carrier.submitPortRequest');
const carrierGetCarrierOnboard = require('./carrier.getCarrierOnboard');
const carrierAuthenticate = require('./carrier.carrierAuthenticate');
const listing = require('./carrier.listing');
const filter = require('./carrier.filter');

router.post('/submitOTP', (req, res)=>{
   try{
      carrierauthenticateOTP.authenticateOTP(req).then((userAuth) => {
        console.log(userAuth);
        res.send(userAuth);
      });
   }
   catch(e) {
     res.send({success: false, message : "Internal Server Error.."});
   }
});

router.post('/authenticateCarrier', (req,res)=>{
  try {
      carrierAuthenticate.checkCarrierAuth(req).then((carrierAuth)=>{
        console.log(carrierAuth);
        res.send(carrierAuth);
      });
  } catch (e) {
    res.send({success:true});
  } 
})

// body contains
// * mobile
// * fromCarrierAddress
// * toCarrierAddress
// * toCountry
router.post('/submitPortRequest',(req, res)=>{
    try {
        carrierSubmitPortRequest.submitPortRequest(req).then((userData) => {
          res.send({success : true , userData});
        }).catch(console.log);
    } catch (e) {
      res.send({success: false, message : "Internal Server Error.."});
    }
});

// * carrierId
// * carrierName
router.post('/carrierOnboard' ,(req,res) => {
  try {
      carrierGetCarrierOnboard.getCarrierOnboard(req, (err, onboard) => {
        if(!err) {
          res.send({success : true, onboard});
        } else {
          res.send({success : false, message : "Internal server Error.."});
        }
      })
  } catch (e) {
    res.send({success : false, message : "Internal server Error.."});
  }
});

router.get('/getCountries', (req, res) => {
  try {
    listing.getCountries(req, (err, countryList) => {
      console.log(err, countryList)
      if(!err) {
        res.send({success : true, countryList});
      } else {
        res.send({success : false, message : "Internal server Error.."});
      }
    })
  } catch (e) {
    res.send({success : false, message : "Internal server Error.."});
  }
});

router.get('/getCarriers', (req, res) => {
  try {
    listing.getCarriers(req, (err, carrierList) => {
      if(!err) {
        res.send({success : true, carrierList});
      } else {
        res.send({success : false, message : "Internal server Error.."});
      }
    })
  } catch (e) {
    res.send({success : false, message : "Internal server Error.."});
  }
});

router.get('/filterByNumber', (req, res) => {
  // mobileNumber, carrier and country and by status
  filter.byNumber(req, (err, result) => {
    if(!err) {
      res.send({success : true, ports: result});
    } else {
      res.send({success : false, message : "Internal server Error.."});
    }
  });
});

router.get('/filterByCarrier', (req, res) => {
  filter.byCarrier(req, (err, result) => {
    if(!err) {
      res.send({success : true, ports: result});
    } else {
      res.send({success : false, message : "Internal server Error.."});
    }
  })
});

module.exports = router;
