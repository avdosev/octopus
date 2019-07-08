const Github = require('./github')
const Bitbucket = require('./bitbucket')

const gitAccounts = require('../git_accounts')

class GitController {
    constructor(id_user) {
        this._id = id_user;
        this._accounts = {};
    }
    
    // нужно для правильной инициализации фабрикой
    async init() {
        const accs = await gitAccounts.getAllAccountsByUser(this._id)
        this._accounts = accs.reduce((acc, cur) => {
            acc[cur.id] = cur;
        }, this._accounts)
    }

    accounts() {
        return this._accounts
    }

    getCurrentControll() {
        return this.controll;
    }

    async setCurrentControll(newAccountId) {
        const acc = this._accounts[newAccountId]
        this.controll = await createControllerByService(acc.account_type, acc)
        return this.controll;
    }

    async addAccount(account_type, username, password) {
        const new_acc = await gitAccounts.createAccount(this._id, account_type, username, password)
        this._accounts[new_acc.id] = new_acc;
        return new_acc
    }
    
}

async function createControllerByService(service, params) {
    const conformity = {
        'github': Github,
        'bitbucket': Bitbucket
    }
    const newController = conformity[service];
    const controller = new newController(params);
    return controller;
}

module.exports = GitController;