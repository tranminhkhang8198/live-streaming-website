const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');




dotenv.config({
    path: path.join(__dirname, './config.env')
});

const app = require("./app");

const DB = process.env.DB_LOCAL || 'mongodb://127.0.0.1:27017/streaming_api';

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
