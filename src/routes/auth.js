//modules
const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const { registerValidator } = require('./../validator/auth');
const { date } = require('./../utils/moment');
const { hash } = require('./../functions/hash');
const { errorHandler } = require('../utils/error');

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
        if (!hashed) errorHandler('hashing error', 1005);
        newUser.password = hashed;
        await newUser.save();
        res.status(201).send('user successfully added');
    } catch (err) {
        console.log(err);
        res.status(400).send('something went wrong');
    }
});

module.exports = router;
