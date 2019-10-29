/**
 * Dependencies requirements
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const gzip = require('compression');
const session = require('express-session');

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

// enable CORS in header
app.use(cors());

// gzip response to reduce their size
app.use(gzip());

// logger
require('../config/logger')(app);

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

// Session
app.use(session({
    secret: "ui2f893hf232ofn3023fp",
    resave: false,
    saveUninitialized: true
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