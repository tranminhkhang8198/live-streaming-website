const Streaming = require("./../models/streaming.model");


exports.getAllStreaming = async (req, res) => {
    try {
        const streamings = await Streaming.find();
        res.status(200).json({
            streamings
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};


exports.getStreaming = async (req, res) => {
    try {
        const streaming = await Streaming.findById(req.params.id);

        res.status(200).json({
            streaming
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.createStreaming = async (req, res) => {
    try {
        const newStreaming = await Streaming.create(req.body);

        res.status(201).json({
            newStreaming
        });

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
};


exports.updateStreaming = async (req, res) => {
    try {
        const streaming = await Streaming.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                streaming
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};


exports.deleteStreaming = async (req, res) => {
    try {
        await Streaming.findByIdAndDelete(req.params.id);

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