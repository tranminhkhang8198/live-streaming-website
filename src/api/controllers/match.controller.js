const httpStatus = require('http-status');

const Match = require('../models/match.model');
const Tournament = require('../models/tournament.model');

async function addTournament(tournament_name, match_id) {
    const tournament = new Tournament({
        name: tournament_name,
        match: match_id
    });

    return await tournament.save();
}

module.exports.getMatches = async (req, res, next) => {
    try {
        const matches = await Match.find({});

        return res.status(httpStatus.OK).json(matches).end();
    } catch (error) {
        next(error);
    }
}

module.exports.getMatchById = async (req, res, next) => {
    try {
        const match = await Match.findById(req.params.id);

        return res.status(httpStatus.OK).json(match).end();
    } catch (error) {
        next(error);
    }
}

module.exports.createMatch = async (req, res, next) => {
    try {
        const {
            fc1,
            fc2,
            time,
            date,
            score,
            streaming_key,
            tournament_name
        } = req.body;

        const match = await new Match({
            fc1,
            fc2,
            time,
            date,
            score,
            streaming_key
        }).save();

        match_id = match._id;

        const newTour = await addTournament(tournament_name, match_id);

        return res.status(httpStatus.CREATED).json(match).end();
    } catch (error) {
        next(error);
    }
}

module.exports.updateMatchById = async (req, res, next) => {
    try {        
        const match = await Match.findOneAndUpdate({
                _id: req.params.id
            },
            req.body
        );
        return res.status(httpStatus.OK).json(match).end();

    } catch (error) {
        next(error);
    }
}

module.exports.deleteMatchById = async (req, res, next) => {
    try {
        const match = await Match.findOneAndDelete({
            _id: req.params.id
        });
        return res.status(httpStatus.OK).json(match).end();
    } catch (error) {
        next(error);
    }
}