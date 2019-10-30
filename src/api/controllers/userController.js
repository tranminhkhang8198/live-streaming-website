const User = require("./../models/userModel");

const {
    env
} = require('../../config/vars');


exports.login = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        
        let ROOT_USER_NAME = 'admin', ROOT_PWD = '123456';

        if (env === 'production') {
            ROOT_PWD = 'dWkyZjg5M2hmMjMyb2ZuMzAyM2Zw';
        }
        
        if (username === ROOT_USER_NAME && password === ROOT_PWD) {
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