const express = require('express');
const router = express.Router();

const {
    userCreateValidator,
    userLoginValidator
} = require('../services/validator');

module.exports = (passport) => {
    router.post(
        '/logout', 
        (req, res) => {
            req.session.destroy(err => {
                res.redirect('/');
            })
        }
    );

    router.post(
        '/register',
        userCreateValidator,
        passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/register'
        }),
    );

    router.post(
        '/signin', 
        userLoginValidator,
        passport.authenticate('local-signin', {
            successRedirect: '/',
            failureRedirect: '/signin'
        })
    );

    return router
}