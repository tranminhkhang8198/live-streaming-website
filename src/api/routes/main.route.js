const Router = require('express').Router();

const {
    homePage,
    adminPage,
    watchStreamingPage,
    createStreamingPage,
    globalConfig,
    renderHighlightVideos,
    renderLoginPage,
    renderSupportUsPage,
} = require('../controllers/main.controller');

/**
* @api {get} /
* @apiDescription Render index page
* @apiVersion 1.0.0
* @apiName Index page
* @apiGroup Main
* @apiPermission Public
*/
Router.route('/').get(homePage);

/**
* @api {get} /streaming
* @apiDescription Render watch streaming page
* @apiVersion 1.0.0
* @apiName WatchStreaming page
* @apiGroup Main
* @apiPermission Public
*/
Router.route('/streaming').get(watchStreamingPage);

/**
* @api {get} /admin/create-streaming
* @apiDescription Render create streaming page
* @apiVersion 1.0.0
* @apiName CreateStreaming page
* @apiGroup Main
* @apiPermission Private
*/
Router.route('/admin/create-streaming').get(createStreamingPage);

/**
* @api {get} /admin
* @apiDescription Render admin page
* @apiVersion 1.0.0
* @apiName Admin page
* @apiGroup Main
* @apiPermission Private
*/
Router.route('/admin').get(adminPage);

/**
* @api {get} /config
* @apiDescription Send neccessary configuration to browser
* @apiVersion 1.0.0
* @apiName Configuration data
* @apiGroup Main
* @apiPermission Private
*
* @apiSuccess (Ok 200) {String} ip - IP address of live-streaming server
* @apiSuccess (Ok 200) {String} port - Port of live-streaming server
*/
Router.route('/config').get(globalConfig);

/**
* @api {get} /highlight_videos/:id
* @apiDescription Render highlight video based on id
* @apiVersion 1.0.0
* @apiName Hightlight videos
* @apiGroup Main
* @apiPermission Public
*/
Router.route('/highlight-videos/:id').get(renderHighlightVideos);

Router.route('/auth/login').get(renderLoginPage);
Router.route('/support-us').get(renderSupportUsPage);

module.exports = Router;