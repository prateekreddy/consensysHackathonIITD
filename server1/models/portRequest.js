const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortRequest = new Schema({
  mobile_number : {
    type : Number,
    trim : true
  },
  country : {
    type : String,
    required : true,
    trim : true
  },
  current_oprator : {
    type : String,
    required : true
  },
  port_date : {
    type : Date,
    required : true,
    trim : true
  },
  reference_number : {
    type : String,
    required : true,
    trim : true
  }
})

module.exports = mongoose.model('PortRequest',PortRequest);
