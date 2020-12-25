const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.status(200).send('hello world');
    } catch (err) {
        res.status(400).send('something went wrong');
    }
});

module.exports = router;
