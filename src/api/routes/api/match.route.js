const Router = require('express').Router();
const {
    getAllMatch,
    createMatch,
    getMatch,
    updateMatch,
    deleteMatch,
} = require("../../controllers/match.controller");



Router
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
    .get(getAllMatch)
    .post(createMatch);

Router
    .route('/:id')
    .get(getMatch)
    .patch(updateMatch)
    .delete(deleteMatch);

module.exports = Router;