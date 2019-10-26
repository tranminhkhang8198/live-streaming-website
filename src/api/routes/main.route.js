const Router = require('express').Router();

const {
    homePage,
    adminPage,
    watchStreamingPage,
    createStreamingPage,
    globalConfig,
} = require('../controllers/main.controller');

/**
 * Render home page
 * @api {get} /
 * @public
 */
Router.route('/').get(homePage);

/**
 * Render streaming page
 * @api {get} /streaming
 * @public
 */
Router.route('/streaming').get(watchStreamingPage);

/**
 * Render create new streaming page
 * @api {get} /admin/create-streaming
 * @public
 */
Router.route('/admin/create-streaming').get(createStreamingPage);

/**
 * Render home page
 * @api {get} /admin
 * @public
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

module.exports = Router;