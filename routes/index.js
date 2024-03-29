const express = require('express')
const bodyParser = require('body-parser');

const config = require('../config')

const Handler = require('../controllers/request_handler')
const Response = require('../controllers/respondent')
const Debug = require('../controllers/debug');

//  проверка логирования
const { isLoggedIn, loggedCheker } = require('../controllers/logged.js');
const api = require('./api')

const initControllers = (app, passport) => {
    //парсим херню
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    // -- STATIC FILES

    app.use('/public',  express.static(config.mainDir + '/public' ));
    
    // -- PAGES --

    app.get('/', isLoggedIn, Response.renderPage.main);
    app.get('/register', Response.renderPage.register);
    app.get('/signin', Response.renderPage.signin);
    app.get('/creating_repo', isLoggedIn, Response.renderPage.createRepo);
    
    app.get('/git/*', isLoggedIn)
    app.get('/git/:user', Response.renderPage.profile)
    app.get('/git/:user/:repo', Response.renderPage.repo)
    app.get('/git/:user/:repo/tree/:branch', Response.renderPage.treeOfRepo)
    app.get('/git/:user/:repo/commits/:branch', Response.renderPage.commitsOfRepo)
    
    // -- (L)USERS API --
    
    app.use('/api', api(passport));

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

