const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationHistory = new Schema({
  location_tag : {
    type : String,
    default : 'Others',
    trim : true
  },
  location_name : {
    type : String,
    required : true,
    trim : true
  },
  geometry : {
    type : Object,
    required : true
  },
  name : {
    type : String,
    required : true,
    trim : true
  },
  icon : {
    type : String,
    required : true
  },
  formatted_address : {
    type : String,
    trim : true
  },
  user_email : {
    type : String,
    required : true
  }
})

module.exports = mongoose.model('LocationHistory',LocationHistory);
