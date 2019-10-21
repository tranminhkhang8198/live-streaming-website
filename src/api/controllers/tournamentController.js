const Tournament = require("./../models/tournamentModel");
const APIFeatures = require("./../utils/apiFeatures");

<<<<<<< HEAD
function removeImg(imgUrl) {

    const img_path = path.join(__dirname, '../uploads/images/' + imgUrl);
    console.log(img_path);

    if (fs.existsSync(img_path)) {
        console.log("something");
        fs.unlinkSync(img_path);
    }
}
=======
>>>>>>> a265ff9dc790704318945f7101f9517b90ff794c

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
        // EXCUTE QUERY
        const features = new APIFeature(Tournament.find(), req.query)
            .filter()

        const tournaments = await features.query;

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
<<<<<<< HEAD
        tournament = await Tournament.findByIdAndDelete(req.params.id);

        removeImg(tournament.imgUrl);
=======
        await Tournament.findByIdAndDelete(req.params.id);
>>>>>>> a265ff9dc790704318945f7101f9517b90ff794c

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