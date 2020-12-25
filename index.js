//modules
const http = require('http');
const express = require('express');
const app = express();
const httpServer = http.createServer(app);
const bodyParser = require('body-parser');

//envirement variable config
require('dotenv').config({ path: './config/config.env' });
const port = process.env.PORT || 8000;

//confing for json parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routing
app.use('/api/auth', require('./src/routes/auth'));

httpServer.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
