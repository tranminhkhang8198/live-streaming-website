const Router = require('express').Router();

const {
    homePage,
    adminPage,
    watchStreamingPage,
    createStreamingPage,
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

module.exports = Router;