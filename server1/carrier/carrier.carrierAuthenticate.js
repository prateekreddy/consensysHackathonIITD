
const checkCarrierAuth = async function(req)
{
  try {
  const promise = new Promise((resolve, reject) => {
    setTimeout(function () {
      if(!req)
      {
        reject({message : "Invalid OTP. Please try again"})
      }
      else {
        resolve({message : "success"})
      }
    console.log('timeout completed');
}, 1000);
  });
  return promise;
  } catch (e) {
    console.log(e);
    const promise = new Promise(function(resolve, reject) {
      reject(e);
    });
    return promise;
  }
}

module.exports = {
  checkCarrierAuth : checkCarrierAuth
}
