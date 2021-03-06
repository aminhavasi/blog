const mongoose = require('mongoose');
const db = () => {
    mongoose.connect(process.env.URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
};

module.exports = { db };
