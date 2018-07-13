const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const jwtDecode = require('jwt-decode');
const jwtConfig = require('../../config/config.js').jwtConfig;
const User = require('../models/User');
const salt = bcrypt.genSaltSync(10);

const authenticateUser = function(req){
  try {
    const promise = new Promise(function(resolve, reject){
      if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        const user = jwtDecode(req.headers.authorization.split(' ')[1]);
        User.findOne({
          email : user.email
        },function(err,user){
          if(err){
            reject(err);
          }
          if(!user){
            reject({
              message : 'User does not exist'
            });
          }else{
            user.hash_password = '';
            delete user.hash_password;
            resolve(user);
          }
        });
      }
    });
    return promise;
  } catch (e) {
    const promise = new Promise(function(resolve, reject) {
      reject(e);
    });
    return promise;
  } finally {

  }
}
const registerUser = function(userToReg){
  try {
    const promise = new Promise(function(resolve, reject) {
          // checking for the existence of user data in database mongodb
          User.findOne({
              email: userToReg.email
          }, function(err, user) {
              if (err) {
                  reject(err);
              }
              if (user) {
                  reject({
                      error: 'User already exists'
                  });
              }else{
                let newUser = new User({
                  fullname : userToReg.fullname,
                  email : userToReg.email,
                  hash_password : bcrypt.hashSync(userToReg.password, salt)
                })
                newUser.save(function(err,user){
                  if(err){
                    console.error(err);
                    reject({
                        error: 'Error occured!!'
                    });
                  }
                  if(!user){
                    reject({
                        error: 'Error occured!!'
                    });
                  }else{
                    resolve(user);
                  }
                });
              }
          });
      });
      return promise;
  } catch (e) {
    const promise = new Promise(function(resolve, reject) {
      reject(e);
    });
    return promise;
  } finally {

  }
}

const loginUser = function(credential){
  try {
    const promise = new Promise(function(resolve,reject){
      User.findOne({
        email : credential.email
      },function(err,user){
        if(err){
          reject({
            error : 'Internal Server Error..'
          });
        }
        if(!user){
          reject({
            error : 'User not found'
          });
        }else{
          if(user.comparePassword(credential.password)){
            user.hash_password = '';
            delete user.hash_password;
            const payload = {
              name : user.fullname,
              email : user.email
            }
            const token = jwt.sign(payload, jwtConfig.secret);
            resolve(token);
          }else{
            reject({
              error : 'Invalid Email/Password'
            });
          }
        }
      });
    });
    return promise;
  } catch (e) {
    const promise = new Promise(function(resolve, reject) {
      reject(e);
    });
    return promise;
  }
}
module.exports = {
  registerUser : registerUser,
  loginUser : loginUser,
  authenticateUser : authenticateUser
}
