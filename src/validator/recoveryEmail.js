const Joi = require('joi');

const recoveryEmailValidation = (email) => {
    const schema = Joi.object({
        email: Joi.string().email().required().max(1024),
    });
    return schema.validate(email);
};

const resetEmailValidator = (password) => {
    const schema = Joi.object({
        password: Joi.string().min(8).max(1024).required(),
    });
    return schema.validate(password);
};

module.exports = {
    recoveryEmailValidation,
    resetEmailValidator,
};
