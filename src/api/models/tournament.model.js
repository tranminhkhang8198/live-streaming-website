const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const TournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    match: {
        type: Schema.Types.ObjectId,
        ref: 'Match',
        required: true,
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Tournament', TournamentSchema, 'tournaments');