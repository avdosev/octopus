const express = require('express')
const bodyParser = require('body-parser');

const config = require('../config')

const {
    userCreateValidator,
    userLoginValidator
} = require('../services/validator');


const Handler = require('../controllers/request_handler')
const Response = require('../controllers/respondent')
const Debug = require('../controllers/debug');

//  проверка логирования
const { isLoggedIn, loggedCheker } = require('../controllers/logged.js');


const initControllers = (app, passport) => {
    //парсим херню
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    // -- STATIC FILES

    app.use('/public',  express.static(config.mainDir + '/public' ));
    
    // -- PAGES --

    app.get('/', Response.renderPage.main);
    app.get('/register', Response.renderPage.register);
    app.get('/signin', Response.renderPage.signin);
    app.get('/:user', Response.renderPage.profile)
    app.get('/:user/:repo')
    app.get('/:user/:repo/tree/:branch')
    app.get('/:user/:repo/commits/:branch')

    // -- (L)USERS API --
   
    app.post(
        '/api/register',
        userCreateValidator,
        passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/register'
        }),
    );

    app.post(
        '/api/signin', 
        userLoginValidator,
        passport.authenticate('local-signin', {
            successRedirect: '/',
            failureRedirect: '/signin'
        })
    );

    //-- ERROR PAGE --
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500);
        next()
    }, Response.renderPage.error_page);

    //-- NOT FOUND PAGE --
    app.use((req, res) => {

    })
};

module.exports = initControllers

