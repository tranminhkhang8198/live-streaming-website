const Match = require("./../models/matchModel");
const APIFeature = require('./../utils/apiFeatures');

exports.getAllMatch = async (req, res) => {
    try {
        // EXCUTE QUERY
        const features = new APIFeature(Match.find(), req.query)
            .filter()
            .time()
            .sort()
            .limitFields()
            .paginate();

        const matches = await features.query;

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: matches.length,
            data: {
                matches
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};


exports.getMatch = async (req, res) => {
    try {
        const match = await Match.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                match
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.createMatch = async (req, res) => {
    try {
        const newMatch = await Match.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                match: newMatch
            }
        });

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
};


exports.updateMatch = async (req, res) => {
    try {
        const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                match
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};


exports.deleteMatch = async (req, res) => {
    try {
        await Match.findByIdAndDelete(req.params.id);

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