//modules
const Joi = require('joi');
const { dateRegexValidator } = require('./../utils/regex');

//register validator
const registerValidator = (body) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().required(),
        bornDate: Joi.string().regex(dateRegexValidator),
        password: Joi.string().min(8).max(1024).required(),
    });

    return schema.validate(body);
};

//login validator
const loginValidator = (body) => {
    const shcema = Joi.object({
        email: Joi.string().min(3).max(255).email().required(),
        password: Joi.string().min(8).max(1024).required(),
    });
    return shcema.validate(body);
};

const editUserValidator = (body) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255),
        email: Joi.string().email(),
        bornDate: Joi.string().regex(dateRegexValidator),
        password: Joi.string().min(8).max(1024),
    });

    return schema.validate(body);
};

module.exports = { registerValidator, loginValidator, editUserValidator };
