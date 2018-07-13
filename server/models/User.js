const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  fullname : {
    type : String,
    trim : true,
    required : true
  },
  email : {
    type : String,
    unique : true,
    lowercase : true,
    trim : true,
    required : true
  },
  hash_password : {
    type : String,
    required : true
  },
  created : {
    type : Date,
    default : Date.now
  }
})

User.methods.comparePassword = function(passowrd){
  return bcrypt.compareSync(passowrd, this.hash_password)
}

module.exports = mongoose.model('User',User);
