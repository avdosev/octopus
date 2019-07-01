require('dotenv').config();
module.exports = 
{
    "development": {
        "username": process.env.LOGININMETIDA,
        "password": process.env.PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.HOST,
        "dialect": "mysql",
        "logging": false
    },
    "test": {
        "username": process.env.LOGININMETIDA,
        "password": process.env.PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.HOST,
        "dialect": "mysql",
        "logging": true
    },
    "production": {
        "username": process.env.USERNAME,
        "password": process.env.PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.HOST,
        "dialect": "mysql",
        "logging": false
    }
}
