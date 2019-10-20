const path = require('path');
const httpStatus = require('http-status');

module.exports.homePage = (req, res, next) => {
    try {
        const pathToFile = path.join(__dirname, '../../../dist/index.html');
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}

module.exports.adminPage = (req, res, next) => {
    try {
        const pathToFile = path.join(__dirname, '../../../dist/admin.html');
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}

module.exports.watchStreamingPage = (req, res, next) => {
    try {
        const pathToFile = path.join(__dirname, '../../../dist/streaming.html');
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}

module.exports.createStreamingPage = (req, res, next) => {
    try {
        const pathToFile = path.join(__dirname, '../../../dist/createStreaming.html');
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}