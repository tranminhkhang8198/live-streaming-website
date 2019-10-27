/**
 * Dependencies requirements
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');

// Express instances
const Router = require(path.join(__dirname, '../api/routes/index.route'));
const app = express();

// serve static files
app.use(express.static(path.join(__dirname, '../../dist')));
app.use('/images', express.static(path.join(__dirname, '../images')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

/**
 * Use middlewares
 */

// middleware to receive data from req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

// logger
require('../config/logger')(app);

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

// Router
app.use(Router);

/**
 * Express instance
 * @public
 */
module.exports = {
    app,    
};