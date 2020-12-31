//modules
const express = require('express');
const { genRecoveryToken } = require('../functions/genRecoveryToken');
const User = require('../models/user');
const sendRecoveryEmail = require('../utils/sendREmail');
const router = express.Router();
const { recoveryEmailValidation } = require('./../validator/recoveryEmail');

//recovery route
router.post('/recovery', async (req, res) => {
    const { error } = await recoveryEmailValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('this email is not exict!!');
        const recoveryToken = await genRecoveryToken(user._id, user.email);
        //must create send with email
        await sendRecoveryEmail(user, recoveryToken);
        res.status(200).send('ok');
    } catch (err) {
        console.log(err);
        res.status(400).send('something went wrong');
    }
});

module.exports = router;
