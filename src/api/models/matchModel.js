const mongoose = require("mongoose");
<<<<<<< HEAD
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
  tournamentImgUrl: {
    type: String,
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
    type: Date
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

=======
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

>>>>>>> a265ff9dc790704318945f7101f9517b90ff794c
const Match = mongoose.model("Match", matchSchema);

module.exports = Match;