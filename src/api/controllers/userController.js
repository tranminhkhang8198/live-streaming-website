const User = require("./../models/userModel");


exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        res.status(200).json({
            user
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};