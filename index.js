//modules
const http = require('http');
const express = require('express');
const app = express();
const httpServer = http.createServer(app);
const bodyParser = require('body-parser');
const rfs = require('rotating-file-stream');
const morgan = require('morgan');
const path = require('path');

const { db } = require('./src/db/mongo');
//envirement variable config
require('dotenv').config({ path: './config/config.env' });
const port = process.env.PORT || 8000;

//db
db();

//loger file
const httpLogger = rfs.createStream('access.log', {
    path: path.resolve(__dirname + '/src/logs'),
    interval: '1d',
    size: '1G',
    compress: 'gzip',
});

//confing for json parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mogan for http logger
app.use(morgan('combined', { stream: httpLogger }));

//routing
app.use(async (err, req, res, next) => {
    try {
        if (err) return res.status(500).send('web error');
        next();
    } catch (err) {
        res.status(400).send('ops!');
    }
});

app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/forgetpassword', require('./src/routes/recoveryWithEmail'));
app.use(async (req, res) => {
    res.status(404).send('the request is incorrect!');
});

httpServer.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
