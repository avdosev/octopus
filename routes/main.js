const express = require('express')
const config = require('../config')

const {
    userCreateValidator,
    userLoginValidator,
    articleValidator
} = require('../services/validator');

const bodyParser = require('body-parser');

const Handler = require('../controllers/request_handler')
const Response = require('../controllers/respondent')

//  проверка логирования
const { isLoggedIn, loggedCheker } = require('../controllers/logged.js');

const Debug = require('../controllers/debug');

const initAuthControllers = (app, passport) => {
    // -- PAGES --

    app.get('/', urlencodedParser, Response.renderPage.index);
    app.get('/register', Response.renderPage.register);
    app.get('/signin', Response.renderPage.signin);

    // -- ARTICLES API -- 

    //парсим херню
    app.use('/api/*', bodyParser.json(), bodyParser.urlencoded({ extended: true }))
    
    // -- (L)USERS API --
   
    app.post(
        '/register',
        urlencodedParser,
        userCreateValidator,
        passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/register'
        }),
    );

    app.post(
        '/sign_In', 
        urlencodedParser,
        userLoginValidator,
        passport.authenticate('local-signin', {
            successRedirect: '/',
            failureRedirect: '/sign_In'
        })
    );

    //-- ERROR PAGE --
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500);
        next()
    }, Response.renderPage.errorPage);

    //-- NOT FOUND PAGE --
    app.use((req, res) => {

    })
};

module.exports = {
    initAuthControllers
};
