const express = require('express');
const router = express.Router();
const locationHistoryController = require('./locationhistory.controller');

router.post('/submitOTP',(req, res)=>{
   try{
     await userAuth = locationHistoryController.authenticateOTP(req);
          console.log(userAuth);
          res.send(userAuth);
   }
   catch(e) {
     res.status(200).send({success: false, message : "Internal Server Error.."});
   }
});

router.post('/submitRequest',(req, res)=>{
    try {
        await userdata = locationHistoryController.submitPortRequest(req);
        res.status(200).send({success : true , userdata});
    } catch (e) {
      res.status(200).send({success: false, message : "Internal Server Error.."});
    }
});

router.post('/carrierOnboard' ,(req,res) => {
  try {
      await onboard = locationHistoryController.getCarrierOnboard(req);
      res.status(200).send({success : true, onboard});
  } catch (e) {
    res.status(200).send({success : false, message : "Internal server Error.."});
  }
});

router.post('/getlocationhistory',function(req,res){
  try {
    locationHistoryController.getLocationHistories(req)
    .then(function(locations){
      res.status(200).send({success: true,locations});
    },function(err){
      res.status(200).send({success: false, message : "Internal Server Error.."});
    });
  } catch (e) {
    res.status(200).send({success: false, message : "Internal Server Error.."});
  }
});

router.post('/locationhistory',function(req,res){
  try {
    locationHistoryController.addLocation(req)
    .then(function(location){
      res.status(200).send({success: true,location});
    },function(err){
      res.status(200).send({success: false,message: "Internal Server Error.."});
    })
  } catch (e) {
    res.status(200).send({success: false,message: "Internal Server Error.."});
  }
});

router.put('/locationhistory',function(req,res){
  try {
    locationHistoryController.updateLocation(req)
    .then(function(location){
      res.status(200).send({success: true,location});
    },function(err){
      res.status(200).send({success: false,message: "Internal Server Error.."});
    })
  } catch (e) {
    console.log(e);
    res.status(200).send({success: false,message: "Internal Server Error.."});
  }
});

router.delete('/locationhistory',function(req,res){
  try {
    locationHistoryController.deleteLocation(req)
    .then(function(message){
      res.status(200).send({success: true});
    },function(err){
      console.log(err);
      res.status(200).send({success: false,message: "Internal Server Error.."});
    })
  } catch (e) {
    console.log(e);
    res.status(200).send({success: false,message: "Internal Server Error.."});
  }
});

module.exports = router;
