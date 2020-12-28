const mongoose = require('mongoose');
const { dateRegexValidator } = require('./../utils/regex');
const bcrypt = require('bcryptjs');
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

// userSchema.pre('save', function (next) {
//     let user = this;

//     if (user.isModified('password')) {
//         bcrypt.genSalt(10, (err, salt) => {
//             if (err) return false;
//             bcrypt.hash(user.password, salt, (err, hash) => {
//                 if (err) return false;
//                 user.password = hash;
//                 next();
//             });
//         });
//     } else {
//         next();
//     }
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
