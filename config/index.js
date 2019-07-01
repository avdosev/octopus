const path = require('path');
const dotenv = require("dotenv")

const production= ((process.env.NODE_ENV === "production") ? true : false)
if (!production) {
    dotenv.load()
}

const port = process.env.PORT;
const url = `localhost:${port}`;
const mainDir = path.join(__dirname, '..');
const imgDir = mainDir + '/public/img';
const secretKey = process.env.SECRET_KEY

const mail = {
    support_email: process.env.MAIL, 
    password: process.env.MAIL_PASSWORD
}

module.exports = {
    port,
    url,
    mainDir,
    imgDir,
    secretKey,
    production,
    mail,
    messages
};
