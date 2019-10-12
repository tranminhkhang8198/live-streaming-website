const Router = require('express').Router();

const {
    createMatch,
    getMatchById,
    updateMatchById,
    deleteMatchById,
    getMatches
} = require('../../controllers/match.controller');

Router.route('').post(createMatch);

Router.route('/all').get(getMatches);

Router.route('/id/:id').get(getMatchById);

Router.route('/id/:id').patch(updateMatchById);

Router.route('/id/:id').delete(deleteMatchById);

module.exports = Router;