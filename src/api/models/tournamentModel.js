const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tournamentSchema = ({
    name: {
        type: String,
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: "SportType"
    }
});


const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;