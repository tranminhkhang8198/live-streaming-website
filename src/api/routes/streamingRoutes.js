const express = require("express");
const streamingController = require("./../controllers/streamingController");

const router = express.Router();

router
    .route('/')
    .get(streamingController.getAllStreaming)
    .post(streamingController.createStreaming);

router
    .route('/:id')
    .get(streamingController.getStreaming)
    .patch(streamingController.updateStreaming)
    .delete(streamingController.deleteStreaming);

module.exports = router;