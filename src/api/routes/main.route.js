const Router = require('express').Router();

const {
    homePage,
    adminPage
} = require('../controllers/main.controller');


/**
 * Render home page
 * @api {get} /
 * @public
 */
Router.route('/').get(homePage);

/**
 * Render home page
 * @api {get} /admin
 * @public
 */
Router.route('/admin').get(adminPage);

module.exports = Router;