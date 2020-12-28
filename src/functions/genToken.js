//modules
const jwt = require('jsonwebtoken');
const Token = require('./../models/token');

//generate token
const genToken = async (id, access) => {
    try {
        const data = {
            id: id.toHexString(),
            access,
        };
        let token = await jwt.sign(data, process.env.JWT_KEY).toString();
        let objToken = {
            user: id,
            token,
        };
        const newToken = await new Token(objToken);
        await newToken.save();
        return true;
    } catch (err) {
        return false;
    }
};

module.exports = { genToken };
