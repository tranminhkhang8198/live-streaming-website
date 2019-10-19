const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());


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