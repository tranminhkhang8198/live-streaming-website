const Router = require('express').Router();

const {
    homePage,
    adminPage,
    streamingPage,
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
Router.route('/streaming').get(streamingPage);

/**
 * Render home page
 * @api {get} /admin
 * @public
 */
Router.route('/admin').get(adminPage);

module.exports = Router;