const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
    name: {
        type: String,
        require: [true, 'A tournament must have a name'],
        unique: true
    },
    matches: [{
        type: Schema.Types.ObjectId,
        ref: "Match"
    }],
    type: {
        type: Schema.Types.ObjectId,
        ref: "SportType"
    },
    tournamentImgUrl: {
        type: String
    }
});

tournamentSchema.plugin(uniqueValidator);

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;