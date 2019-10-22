const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const matchSchema = new mongoose.Schema({
  fc1: {
    type: String
  },
  fc1ImgUrl: {
    type: String
  },
  fc2ImgUrl: {
    type: String
  },
  fc2: {
    type: String
  },
  score1: {
    type: String,
    default: 0
  },
  score2: {
    type: String,
    default: 0
  },
  time: {
    type: Date,
    default: Date.now()
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: "SportType"
  },
  streaming: {
    type: Schema.Types.ObjectId,
    ref: "Streaming",
    required: [true, "A match must have a streaming"],
    unique: true
  }
});

matchSchema.plugin(uniqueValidator);

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;