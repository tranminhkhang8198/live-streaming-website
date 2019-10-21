const express = require("express");
const sportTypeController = require("./../controllers/sportTypeController");

const router = express.Router();

router
    .route('/')
    .get(sportTypeController.getAllSportType)
    .post(sportTypeController.createSportType);

router
    .route('/:id')
    .get(sportTypeController.getSportType)
    .patch(sportTypeController.updateSportType)
    .delete(sportTypeController.deleteSportType);

module.exports = router;