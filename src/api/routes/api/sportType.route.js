const Router = require('express').Router();
const {
    getAllSportType,
    createSportType,
    getSportType,
    updateSportType,
    deleteSportType
} = require("../../controllers/sportType.controller");

Router
    .route('/')
    .get(getAllSportType)
    .post(createSportType);

Router
    .route('/:id')
    .get(getSportType)
    .patch(updateSportType)
    .delete(deleteSportType);

module.exports = Router;