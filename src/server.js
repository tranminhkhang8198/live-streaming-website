const fs = require('fs');

const {
    app,
} = require('./config/express');

const {
    port,
    env
} = require('./config/vars');

const options = {
    cert: fs.readFileSync('/etc/letsencrypt/live/mystream.noat.me/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/mystream.noat.me/privkey.pem'),
}

const server = require('http').createServer(options, app);

// connect to mongodb
require('./config/mongoose').connect();

server.listen(port, () => console.log(`Server is started on port: ${port} (${env})`));

/**
 * App instance - For testing purposes
 * @public
 */
module.exports = {
    app,
    server,
};