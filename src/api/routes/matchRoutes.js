const express = require("express");
const matchController = require("./../controllers/matchController");

const router = express.Router();

router    
    .route('/')
    /**
    * @api {get} /api/matches
    * @apiDescription Get all matches
    * @apiVersion 1.0.0
    * @apiName Get matches
    * @apiGroup Match
    * @apiPermission Public
    *
    * @apiSuccess (Ok 200) {String} msg - Successfully get matches
    *
    * @apiError (Not Found 404) {String} msg - No matches found
    */
    .get(matchController.getAllMatch)
    .post(matchController.createMatch);

router
    .route('/:id')
    .get(matchController.getMatch)
    .patch(matchController.updateMatch)
    .delete(matchController.deleteMatch);

module.exports = router;