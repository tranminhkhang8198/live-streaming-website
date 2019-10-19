const mongoose = require("mongoose");

const sportTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A sport type must have a name']
    }
});

const SportType = mongoose.model("SportType", sportTypeSchema);

module.exports = SportType;