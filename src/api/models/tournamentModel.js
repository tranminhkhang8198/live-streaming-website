const mongoose = require("mongoose");
<<<<<<< HEAD
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
    imgUrl: {
        type: String
    }
});

tournamentSchema.plugin(uniqueValidator);
=======
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

>>>>>>> a265ff9dc790704318945f7101f9517b90ff794c

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;