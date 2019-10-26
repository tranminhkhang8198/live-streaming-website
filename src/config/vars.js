const path = require('path');

// config env 
require('dotenv').config({
    path: path.join(__dirname, '../config.env'),
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    db: {
        uri: process.env.DB_URI
    }    
};