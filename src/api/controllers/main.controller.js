const path = require('path');
const httpStatus = require('http-status');
const { liveServer } = require(path.join(__dirname, '../../config/vars'));

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
        if (!req.session.user) {
            return res.redirect('/');
        }

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
        if (!req.session.user) {
            return res.redirect('/');
        }
        const pathToFile = path.join(__dirname, '../../../dist/createStreaming.html');
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}

module.exports.globalConfig = (req, res, next) => {
    try {
        const { ip, domain } = liveServer;
        return res.status(httpStatus.OK).json({ domain, ip }).end();
    } catch (error) {
        next(error);
    }
}

module.exports.renderHighlightVideos = (req, res, next) => {
    try {
        const id = req.params.id;
        const pathToFile = path.join(__dirname, `../../../dist/highlight-videos-${id}.html`);
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}

module.exports.renderLoginPage = (req, res, next) => {
    try {
        const pathToFile = path.join(__dirname, `../../../dist/login.html`);
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}

module.exports.renderSupportUsPage = (req, res, next) => {
    try {
        const pathToFile = path.join(__dirname, `../../../dist/support-us.html`);
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}