const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const streamingSchema = mongoose.Schema({
    status: {
        type: Boolean,
    },
    startAt: {
        type: Date,
        default: Date.now()
    },
    endAt: {
        type: Date,
    },
    match: {
        type: Schema.Types.ObjectId,
        ref: "Match",
        unique: true
    }
});

streamingSchema.plugin(uniqueValidator);


const Streaming = mongoose.model("Streaming", streamingSchema);

module.exports = Streaming;