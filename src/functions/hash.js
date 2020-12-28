//modules
const bcrypt = require('bcryptjs');

//hash password
const hash = async (password) => {
    let salt = await bcrypt.genSalt(10); //gen salt for hasing
    let hash = await bcrypt.hash(password, salt); //hash password
    return hash;
};

//compire passwords
const deHash = async (bodyPassword, password) => {
    let compire = await bcrypt.compare(bodyPassword, password);
    return compire;
};
module.exports = { hash, deHash };
