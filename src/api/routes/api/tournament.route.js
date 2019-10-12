const Router = require('express').Router();

const {
    getTournaments,
    createTournament,
    getTournamentById,
    updateTournamentById,
    deleteTournamentById
} = require('../../controllers/tournament.controller');

Router.route('/all').get(getTournaments);

Router.route('/').post(createTournament);

Router.route('/id/:id').get(getTournamentById);
Router.route('/id/:id').patch(updateTournamentById);
Router.route('/id/:id').delete(deleteTournamentById);



module.exports = Router;