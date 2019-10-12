const Router = require('express').Router();

const mainRoutes = require('./main.route');

const matchRoutes = require('./api/match.route');
const tournamentRoutes = require('./api/tournament.route');

Router.use('/', mainRoutes);
Router.use('/api/match', matchRoutes);
Router.use('/api/tournament', tournamentRoutes);

module.exports = Router;