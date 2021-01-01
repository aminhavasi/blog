//modules
const express = require('express');
const { genRecoveryToken } = require('../functions/genRecoveryToken');
const User = require('../models/user');
const sendRecoveryEmail = require('../utils/sendREmail');
const Recovery = require('./../models/recovery');
const router = express.Router();
const { hash } = require('./../functions/hash');
const {
    recoveryEmailValidation,
    resetEmailValidator,
} = require('./../validator/recoveryEmail');
const { errorHandler } = require('./../utils/error');
//recovery route
router.post('/recovery', async (req, res) => {
    const { error } = await recoveryEmailValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('this email is not exict!!');
        const recoveryToken = await genRecoveryToken(user._id, user.email);

        const newRecovery = await new Recovery({
            user: user._id,
            token: recoveryToken,
        });
        await newRecovery.save();
        await sendRecoveryEmail(user, recoveryToken);
        res.status(200).send('ok');
    } catch (err) {
        res.status(400).send('something went wrong');
    }
});
//reset for final part of forget password
router.post('/reset', async (req, res) => {
    if (!req.headers['x-recovery-token'])
        return res.status(404).send('faild request');
    const { error } = await resetEmailValidator(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    try {
        const userToken = await Recovery.findOne({
            token: req.headers['x-recovery-token'],
        });
        if (!userToken) return res.status(400).send('token is invalid');
        const hashed = await hash(req.body.password);

        const user = await User.findOne({ _id: userToken.user });
        if (!user)
            throw errorHandler('user not found.system is update or crashd!');
        user.password = hashed;

        await user.save();
        await Recovery.findOneAndRemove({
            token: req.headers['x-recovery-token'],
        });
        res.status(200).send('ok');
    } catch (error) {
        console.log(error);

        res.status(400).send('err');
    }
});

module.exports = router;
