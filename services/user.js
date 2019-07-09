const { user: User } = require('../database/models')

function getUserById(userId) {
    return User.findOne({
        where: {
           id: userId
        }
    })
}

function getUserByEmail(email) {
    return User.findOne({
        where: {
           email
        }
    })
}

function createUser(email, username, password) {
    return User.create({
        email,
        username,
        password
    })
}

function changeCurrentAccoutn(id, newCurrent) {
    return User.update({
        current_account: newCurrent
    },{
        where: {
            id
        },

    })
}

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    changeCurrentAccoutn,
}


