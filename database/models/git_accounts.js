const { services } = require('../../config')

module.exports = (sequelize, Sequelize) => {
    let accounts = sequelize.define('git_accounts', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        user_id: { type: Sequelize.INTEGER },
        account_type: { type: Sequelize.ENUM(...services)  },
        token: { type: Sequelize.STRING },
        username: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING }
    });

    return accounts;
};