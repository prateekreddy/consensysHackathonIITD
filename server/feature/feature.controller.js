const Feature = require('../models/Feature');


const getUserFeatures = function(req) {
  try {
    const promise = new Promise(function(resolve,reject){
      Feature.find().elemMatch({user_types : req.user.user_type},function(err,features){
        if(err){
          reject({message : "Internal Server Error.."});
        }
        if(!features){
          reject({message : "Internal Server Error.."});
        }else{
          resolve(features);
        }
      })
    })
    return promise;
  } catch (e) {
    console.log(e);
    const promise = new Promise(function(rresolve,reject){
      reject({message : "Internal Server Error.."});
    });
    return promise;
  }
}

const addFeatures = function(req){
  try {
    const promise = new Promise(function(resolve,reject){
      if(req.user.user_type.code !== 91){
        reject({message : "Unauthorized access"});
      }
      const featureData = req.body;
      const user_codes = featureData.user_codes.map((user_code) => {
        return {code : user_code};
      })
      UserType.find(user_codes,function(err,userTypes){
          if(err){
            reject({message : "Internal Server Error.."});
          }
          if(!userTypes){
            reject({message : "Internal Server Error.."});
          }else{
            const newFeature = new Feature({
              label : featureData.label,
              parent_id : featureData.parent_id,
              description : featureData.description,
              user_types : userTypes
            });
            newFeature.save(function(err,feature){
              if(err){
                reject({message : "Internal Server Error.."});
              }
              if(!feature){
                reject({message : "Internal Server Error.."});
              }else{
                if(feature.parent_id !== null){
                  Feature.find({_id : feature._id},function(err,parentFeature){
                    if(err){
                      reject({message : "Internal Server Error.."});
                    }
                    if(!parentFeature){
                      reject({message : "Internal Server Error.."});
                    }else{
                      const siblingFeatures = parentFeature.sub_feature;
                      siblingFeatures.push(feature);
                      parentFeature.sub_feature = siblingFeatures;
                      parentFeature.save(function(err,mainFeature){
                        if(err){
                          reject({message : "Internal Server Error.."});
                        }
                        if(!mainFeature){
                          reject({message : "Internal Server Error.."});
                        }else{
                          resolve(feature);
                        }
                      })
                    }
                  })
                }
              }
            });
          }
      })
    })
    return promise;
  } catch (e) {
    console.log(e);
    const promise = new Promise(function(resolve,reject){
      reject({message : "Internal Server Error.."});
    })
    return promise;
  }
}
