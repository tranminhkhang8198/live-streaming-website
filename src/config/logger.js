const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

const { env } = require('./vars');

module.exports = app => {
    if (env === 'development') {
        app.use(morgan('dev'));
    } else {
        const logDirectory = path.join(__dirname, '../../log');
        // ensure log directory exists
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

        app.use(morgan('combined', {
            stream: rfs('access.log', {
                interval: '1d',
                path: logDirectory
            })
        }))
    }
}