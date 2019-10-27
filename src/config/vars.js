const path = require('path');

// config env 
require('dotenv').config({
    path: path.join(__dirname, '../../.env'),
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    db: {
        uri: process.env.DB_URI
    },
    liveServer: {
        ip: process.env.LIVE_SERVER_IP,
        port: process.env.LIVE_SERVER_PORT
    }
};