const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new mongoose.Schema({
    fc1: {
        type: String,
    },
    fc2: {
        type: String,
    },
    score: {
        type: String,
    },
    time: {
        type: Date,
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: "SportType"
    },
    tournament: {
        type: Schema.Types.ObjectId,
        ref: "Tournament"
    }
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;