module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define('user', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        username: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING, validate: { isEmail: true } },
        password: { type: Sequelize.STRING, allowNull: false },
        current_account: { 
            type: Sequelize.INTEGER, 
            allowNull: true, 
            defaultValue: Sequelize.NULL
        }
    });

    return User;
};
