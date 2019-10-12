const Tournament = require('../models/tournament.model');
const httpStatus = require('http-status');

module.exports.getTournaments = async (req, res, next) => {
    try {
        const tournaments = await Tournament.find({});
        return res.status(httpStatus.OK).json(tournaments).end();
    } catch (error) {
        next(error);
    }
}

module.exports.getTournamentById = async (req, res, next) => {
    try {
        const tournament = await Tournament.findById(req.params.id);

        return res.status(httpStatus.OK).json(tournament).end();
    } catch (error) {
        next(error);
    }
}

module.exports.createTournament = async (req, res, next) => {
    try {
        const {
            name,
            match
        } = req.body;

        const tournament = new Tournament({
            name,
            match
        }).save();

        return res.status(httpStatus.CREATED).json(tournament).end();
    } catch (error) {
        next(error);
    }
}

module.exports.updateTournamentById = async (req, res, next) => {
    try {
        const tournament = await Tournament.findOneAndUpdate({
                _id: req.params.id
            },
            req.body
        );
        return res.status(httpStatus.OK).json(tournament).end();
    } catch (error) {
        next(error);
    }
}

module.exports.deleteTournamentById = async (req, res, next) => {
    try {
        const tournament = await Tournament.findOneAndDelete({
            _id: req.params.id
        });
        return res.status(httpStatus.OK).json(tournament).end();
    } catch (error) {
        next(error);
    }
}