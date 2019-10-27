const Router = require('express').Router();
const {
    getAllTournament,
    createTournament,
    getTournament,
    updateTournament,
    deleteTournament
} = require("../../controllers/tournament.controller");

Router
    .route('/')
    .get(getAllTournament)
    .post(createTournament);

Router
    .route('/:id')
    .get(getTournament)
    .patch(updateTournament)
    .delete(deleteTournament);

module.exports = Router;