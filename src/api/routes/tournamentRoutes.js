const express = require("express");
const tournamentController = require("./../controllers/tournamentController");

const router = express.Router();

router
    .route('/')
    .get(tournamentController.getAllTournament)
    .post(tournamentController.createTournament);

router
    .route('/:id')
    .get(tournamentController.getTournament)
    .patch(tournamentController.updateTournament)
    .delete(tournamentController.deleteTournament);

module.exports = router;