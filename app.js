const path = require('path');
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
// const favicon = require('serve-favicon');
const models = require('./database/models');


const initControllers = require('./routes');
const { loadPasportStrategies } = require('./controllers/users');
const config = require("./config")
const { port, imgDir } = config;
// For Passport
app.use(
    session({ secret: config.secretKey, resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize()); //возможно, нужно чистить сессии
app.use(passport.session()); // persistent login sessions

app.set('views', './views');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// добавлю как будет время
// app.use(favicon(path.join(imgDir, 'logo.ico')));

//app.use(logRequest); // логирование всех (или тех что никак не обработались) запросов

initControllers(app, passport);
loadPasportStrategies(passport, models.user);

async function start() {
    try {
        await models.sequelize.sync()
        console.log('Nice! Database looks fine');
    } catch(err) {
        console.log('Something went wrong with the Database Update!');
        console.log("Crashed with error: " + err)
        return; // потому что оборачивать все в трай кетч блок - не тру
    }

    app.listen(port, err => {
        if (!err) console.log('Server started on ' + port + ' port');
        else console.log('Server not started');
    });
}

start().catch(err => console.log('server not started'));

module.exports = app
