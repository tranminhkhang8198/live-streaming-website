const Router = require('express').Router();

const mainRoutes = require('./main.route');
const authRoutes = require('./userRoutes');

const matchRoutes = require('./api/match.route');
const sportTypeRoutes = require('./api/sportType.route');
const tournamentRoutes = require('./api/tournament.route');
const streamingRoutes = require('./api/streaming.route');

Router.use('/auth', authRoutes);

Router.use('/api/sport-types', sportTypeRoutes);
Router.use('/api/tournaments', tournamentRoutes);
Router.use('/api/matches', matchRoutes);
Router.use('/api/streamings', streamingRoutes);

Router.use('', mainRoutes);

module.exports = Router;