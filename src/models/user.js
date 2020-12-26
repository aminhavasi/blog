const mongoose = require('mongoose');

const { dateRegexValidator } = require('./../utils/regex');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
        unique: true,
    },
    bornDate: {
        type: String,
        validate: {
            validator: function (v) {
                return dateRegexValidator.test(v);
            },
        },
    },
    adminLevel: {
        type: String,
        default: 'user',
        required: true,
        enum: ['user', 'admin', 'creator'],
    },
    date: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return dateRegexValidator.test(v);
            },
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
