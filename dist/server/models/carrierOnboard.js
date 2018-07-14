const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarrierOnboard = new Schema({
  carrier_id : {
    type : String,
    default : 'Others',
    trim : true
  },
  country : {
    type : String,
    required : true,
    trim : true
  },
  circle : {
    type : String,
    required : true
  },
  portalAddress : {
    type : String,
    required : true,
    trim : true
  }
})

CarrierOnboard.index({ carrier_id: 1, country: 1}, { unique: true });


module.exports = mongoose.model('CarrierOnboard',CarrierOnboard);
