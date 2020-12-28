const bcrypt = require('bcryptjs');

const hash = async (password) => {
    let salt = await bcrypt.genSalt(10); //gen salt for hasing
    let hash = await bcrypt.hash(password, salt); //hash password
    return hash;
};

module.exports = { hash };
