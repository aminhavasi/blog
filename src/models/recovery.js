//modules
const mongoose = require('mongoose');

//cretae a schema for recovey token
const recoverySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    token: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
        index: {
            expires: '60m',
        },
    },
});

const Recovery = mongoose.model('Recovery', recoverySchema);

module.exports = Recovery;
