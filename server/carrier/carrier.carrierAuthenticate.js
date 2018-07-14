
const checkCarrierAuth =  function(req, callback)
{
  try {
    setTimeout(function () {
      if(!req)
      {
        callback(null, {message : "Invalid user name and password. Please try again"})
      }
      else {
        callback(null, {message : "success"})
      }
    console.log('timeout completed');
}, 1000);
  } catch (e) {
    callback(e,null);
  }
}

module.exports = {
  checkCarrierAuth : checkCarrierAuth
}
