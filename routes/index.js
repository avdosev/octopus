const express = require('express')
const bodyParser = require('body-parser');

const config = require('../config')

const Handler = require('../controllers/request_handler')
const Response = require('../controllers/respondent')
const Debug = require('../controllers/debug');

//  проверка логирования
const { isLoggedIn, loggedCheker } = require('../controllers/logged.js');
const user_api = require('./user_api')

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
    app.get('/:user/:repo', Response.renderPage.repo)
    app.get('/:user/:repo/tree/:branch', Response.renderPage.treeOfRepo)
    app.get('/:user/:repo/commits/:branch', Response.renderPage.commitsOfRepo)
    
    // -- (L)USERS API --
    
    app.use('/api', user_api(passport));

    //-- ERROR PAGE --
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500);
        next()
    }, Response.renderPage.error_page);

    //-- NOT FOUND PAGE --
    app.use(Response.renderPage.not_found)
};

module.exports = initControllers

