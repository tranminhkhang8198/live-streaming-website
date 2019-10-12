const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    fc1: {
        type: String,
        required: true,
    },
    fc2: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    score: {
        type: String,
        required: true
    },
    streaming_key: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Match', MatchSchema, 'matches');