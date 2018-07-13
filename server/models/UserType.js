const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserType = new Schema({
  user_type : {
    type : String,
    required : true,
    trim : true
  },
  code : {
    type : Number,
    required : true
  }
})

module.exports = mongoose.model('UserType',UserType);
