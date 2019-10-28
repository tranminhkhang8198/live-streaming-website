const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const streamingSchema = mongoose.Schema({
    streamingTitle: String,
    streamingUrl: {
        type: [String],
    },
    status: {
        type: Boolean,
        default: false
    },
    startAt: {
        type: Date,
        default: Date.now()
    }
});

streamingSchema.plugin(uniqueValidator);

const Streaming = mongoose.model("Streaming", streamingSchema);

module.exports = Streaming;