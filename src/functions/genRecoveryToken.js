//modules
const CryptoJS = require('crypto-js');

//generate recovery token for recovey account
const genRecoveryToken = (id, email) => {
    let ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify({ id, email }),
        process.env.RECOVERY_KEY
    ).toString();
    return ciphertext;
};

//send  gen recovery token
module.exports = { genRecoveryToken };
