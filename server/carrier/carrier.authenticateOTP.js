
const authenticateOTP = async function(req, callback)
{
  try {
    setTimeout(function () {
      if(isNaN(req.otp))
      {
        callback(null, {message : "Invalid OTP. Please try again"})
      }
      else {
        callback(null, {message : "success"})
      }
    console.log('timeout completed');
}, 1000);
  } catch (e) {
    console.log(e);
    callback(e,null);
  }
}

module.exports = {
  authenticateOTP : authenticateOTP
}
