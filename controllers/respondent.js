function jsonValuesWith(arr) {
    return function(req, res) {
        const obj = new Object;
        for (let i = 0; i < arr.length; i++) {
            const key = arr[i]
            if (res.values.hasOwnProperty(key)) {
                obj[key] = res.values[key]
            }
        }
        res.json(obj)
    }
}

function jsonValue(key) {
    return function (req, res, next) {
        if (res.values[key])
            res.json(res.values[key])
        else {
            res.statusCode = 404;
            res.json({
                message: 'not found'
            })
        }
    }
}

const renderPage = require('./pages');

module.exports = {
    renderPage,
    jsonValuesWith,
    jsonValue
};