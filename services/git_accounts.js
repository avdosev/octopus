const { git_accounts: git} = require('../database/models')

async function getAccountById(id) {
    return git.findOne({
        where: {
            id
        }
    })
}

async function getAllAccountsByUser(user_id) {
    return git.findAll({
        where: {
            user_id
        }
    })
}

async function createAccount(user_id, account_type, username, password, token = 'none') {
    return git.create({
        username, password, token, user_id, account_type
    })
}

module.exports = {
    getAccountById,
    getAllAccountsByUser,
    createAccount
}