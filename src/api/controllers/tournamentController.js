const Tournament = require("./../models/tournamentModel");


exports.getAllTournament = async (req, res) => {
    try {
        const tournaments = await Tournament.find();

        res.status(200).json({
            status: 'success',
            results: tournaments.length,
            data: {
                tournaments
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};


exports.getTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                tournament
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.createTournament = async (req, res) => {
    try {
        const newTournament = await Tournament.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tournament: newTournament
            }
        });

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
};


exports.updateTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                tournament
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};


exports.deleteTournament = async (req, res) => {
    try {
        await Tournament.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}