const User = require("./../models/userModel");


exports.login = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (username === 'admin' && password === 'dWkyZjg5M2hmMjMyb2ZuMzAyM2Zw') {
            const user = {
                username, password
            }
            // store user session
            req.session.user = user;            

            return res.redirect('/admin');
        }        

        // redirect to login page
        return res.redirect('/auth/login');

    } catch (err) {        
        return res.redirect('/');
    }
};