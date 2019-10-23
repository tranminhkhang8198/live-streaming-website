const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

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

app.use(express.static(path.join(__dirname, '../../dist')));
app.use('/images', express.static(path.join(__dirname, '../images')));
app.use('/scripts', express.static(path.join(__dirname, '../scripts')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

if (process.env.NODE_ENV === 'development') {
    app.use(require('morgan')('dev'));
}

const mainRoute = require('./routes/main.route');
const sportTypeRoute = require('./routes/sportTypeRoutes');
const tournamentRoute = require('./routes/tournamentRoutes');
const matchRoute = require('./routes/matchRoutes');
const streamingRoute = require('./routes/streamingRoutes');

// ROUTES
app.use(mainRoute);
app.use('/api/sport-types', sportTypeRoute);
app.use('/api/tournaments', tournamentRoute);
app.use('/api/matches', matchRoute);
app.use('/api/streamings', streamingRoute);

module.exports = app;