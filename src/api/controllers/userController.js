const User = require("./../models/userModel");


exports.login = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({
            username: username,
            password: password
        });

        if (user) {
            // store user session
            req.session.user = user;

            // redirect to admin page
            const pathToFile = path.join(__dirname, '../');
            return res.status(httpStatus.OK)
                .sendFile(pathToFile);
        }

        // redirect to login page
        const pathToFile = path.join(__dirname, '../');
        return res.status(httpStatus.OK)
            .sendFile(pathToFile)

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};


exports.admin = async (req, res) => {
    if (!req.session.user) {
        return res.redirect(__dirname, '../../views/index.pug');
    }

    // Redirect to admin page
    const pathToFile = path.join(__dirname, '../');
    return res.status(httpStatus.OK)
        .sendFile(pathToFile);
}