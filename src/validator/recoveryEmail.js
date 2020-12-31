const Joi = require('joi');

const recoveryEmailValidation = (email) => {
    const schema = Joi.object({
        email: Joi.string().email().required().max(1024),
    });
    return schema.validate(email);
};

module.exports = {
    recoveryEmailValidation,
};
