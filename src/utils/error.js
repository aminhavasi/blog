//simple and overwite error handle that can use code for determine errors
const errorHandler = (message, code) => {
    const err = new Error(message);
    err.code = code;
    return err;
};

module.exports = { errorHandler };
