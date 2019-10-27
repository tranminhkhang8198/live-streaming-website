const Router = require('express').Router();
const {
    getAllStreaming,
    createStreaming,
    getStreaming,
    updateStreaming,
    deleteStreaming,
} = require("../../controllers/streaming.controller");

Router
    .route('/')
    .get(getAllStreaming)
    .post(createStreaming);

Router
    .route('/:id')
    .get(getStreaming)
    .patch(updateStreaming)
    .delete(deleteStreaming);

module.exports = Router;