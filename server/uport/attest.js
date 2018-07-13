const { Credentials, SimpleSigner } = require('uport');

const validity = 5; // validity in years
const credentials = {
    Passport: 'ABCXYZ'
}


const uport = new Credentials({
    appName: 'Mobile Number Porting',
    address: '2p29ciAQ1zDPLsATkFVv9XzB3pRJSPRUYH6',
    network: 'rinkeby',
    signer: SimpleSigner('52bd25fa30a2544a5d40815b1d8d1cb0725795f3259897e4604915404912f1db')
})

// uport.requestCredentials({
//     requestCredentials: ['name']
// }).then((userProfile) => {
//     console.log(userProfile)
// });

credentials.createRequest({
    requested:[],
    notifications: true
  }).then(requestToken => {
    // send to browser
  })

uport.attest({
    sub: '2oiDwq3DaYpDGLcscpEyCfApzmvJ6BhB4By',
    claims: credentials,
    exp: new Date().getTime() + validity*12*30*24*60*60*1000, // five year validity
    notifications: true
}).then(attestationjwt => {
    credentials.push(pushToken, `me.uport:add?attestation=${attestationjwt}`, message).then(response => {
        console.log(response);
    })
});