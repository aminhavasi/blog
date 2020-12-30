//modules
const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const Token = require('./../models/token');
const { registerValidator, loginValidator } = require('./../validator/auth');
const { date } = require('./../utils/moment');
const { hash, deHash } = require('./../functions/hash');
const { errorHandler } = require('../utils/error');
const { genToken } = require('./../functions/genToken');
//register route
router.post('/register', async (req, res) => {
    try {
        const { error } = await registerValidator(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('this user Already exict!');
        req.body.date = date;
        const newUser = await new User(req.body);
        const hashed = await hash(newUser.password);
        if (!hashed) throw errorHandler('hashing error', 1005);
        newUser.password = hashed;
        await newUser.save();
        const tokenRes = await genToken(newUser._id, newUser.adminLevel);
        if (tokenRes === false)
            throw errorHandler('generate token failed!', 1006);
        res.status(201)
            .header('x-auth-token', tokenRes)
            .send('user successfully added');
    } catch (err) {
        res.status(400).send('something went wrong');
    }
});

//login route

router.post('/login', async (req, res) => {
    const { error } = await loginValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(403).send('email or password is incorrect');
        const resPass = await deHash(req.body.password, user.password);
        if (!resPass)
            return res.status(400).send('email or password is incorrect');
        const tokenRes = await genToken(user._id, user.adminLevel);

        await res.status(200).header('x-auth-token', tokenRes).send('ok');
    } catch (error) {
        res.status(400).send('bad');
    }
});

router.delete('/logout', async (req, res) => {
    try {
        const tokenRemove = await Token.findOneAndDelete({
            token: req.body.token,
        });
        if (!tokenRemove) throw errorHandler('token is invalid!');
        res.status(200).send('logout successfully');
    } catch (err) {
        res.status(400).send('faild logout!');
    }
});

module.exports = router;
