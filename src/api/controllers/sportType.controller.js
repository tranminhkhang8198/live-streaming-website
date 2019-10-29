const SportType = require("./../models/sportType.model");


exports.getAllSportType = async (req, res) => {
    try {
        const sportTypes = await SportType.find();

        res.status(200).json({
            sportTypes
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};


exports.getSportType = async (req, res) => {
    try {
        const sportType = await SportType.findById(req.params.id);

        res.status(200).json({
            sportType
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.createSportType = async (req, res) => {
    try {
        const newSportType = await SportType.create(req.body);

        res.status(201).json({
            newSportType
        });

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
};


exports.updateSportType = async (req, res) => {
    try {
        const sportType = await SportType.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            // runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                sportType
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};


exports.deleteSportType = async (req, res) => {
    try {
        await SportType.findByIdAndDelete(req.params.id);

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