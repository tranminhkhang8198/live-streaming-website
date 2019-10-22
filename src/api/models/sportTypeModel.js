const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const sportTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A sport type must have a name'],
        unique: true
    }
});

sportTypeSchema.plugin(uniqueValidator);

const SportType = mongoose.model("SportType", sportTypeSchema);

module.exports = SportType;