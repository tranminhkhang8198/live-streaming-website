const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('dev'));


const sportTypeRoute = require('./routes/sportTypeRoutes');
const tournamentRoute = require('./routes/tournamentRoutes');
const matchRoute = require('./routes/matchRoutes');
const streamingRoute = require('./routes/streamingRoutes');

// ROUTES
app.use('/api/sport-types', sportTypeRoute);
app.use('/api/tournaments', tournamentRoute);
app.use('/api/matches', matchRoute);
app.use('/api/streamings', streamingRoute);

module.exports = app;