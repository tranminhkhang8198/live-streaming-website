const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const streamingSchema = mongoose.Schema({
<<<<<<< HEAD
    title: String,
    streamingUrl: {
        type: [String],
    },
    status: {
        type: Boolean,
        default: false
=======
    status: {
        type: Boolean,
>>>>>>> a265ff9dc790704318945f7101f9517b90ff794c
    },
    startAt: {
        type: Date,
        default: Date.now()
<<<<<<< HEAD
=======
    },
    endAt: {
        type: Date,
    },
    match: {
        type: Schema.Types.ObjectId,
        ref: "Match",
        unique: true
>>>>>>> a265ff9dc790704318945f7101f9517b90ff794c
    }
});

streamingSchema.plugin(uniqueValidator);

<<<<<<< HEAD
=======

>>>>>>> a265ff9dc790704318945f7101f9517b90ff794c
const Streaming = mongoose.model("Streaming", streamingSchema);

module.exports = Streaming;