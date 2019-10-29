const express = require("express");
const userController = require("./../controllers/userController");

const router = express.Router();

router
    .route('/login')
    .post(userController.login);

router
    .route('/admin')
    .get(userController.admin);

module.exports = router;