function isLoggedIn(req, res, next) {
    //топовая проверка на допуск юзера до страницы 
    if (req.isAuthenticated()) return next();
    res.render('start_page', { title: 'Octobucket'});
}

function loggedCheker(req, res, next) {
    if (req.isAuthenticated()) return next()
    
    res.statusCode = 401
    res.send('you are not logged')
}

module.exports = {
    isLoggedIn,
    loggedCheker
};
