const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserType = require('./UserType.js');

const Feature = new Schema({
  label : {
    type : String,
    required : true,
    trim : true,
    default : 'Comming Soon'
  },
  creation_time : {
    type : Date,
    required : true,
    default : Date.now
  },
  parent_id : {
    type : Number,
    default : null,
    required : true
  },
  sub_feature : {
    type : [Feature],
    default : []
  },
  description : {
    type : String,
    default : ''
  },
  user_types : {
    type : [UserType],
    required : true
  }
})

module.exports = mongoose.model('Feature',Feature);
