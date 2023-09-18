const { Model, DataTypes } = require('sequelize');

class Users extends Model {}
Users.init({
    id:{
        type: DataTypes.INTERGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username:{
        type: DataTypes.STRING(30),
    },
    email:{
        type: DataTypes.STRING(60),
    },
    password:{
        type: DataTypes.STRING(120),
    },
});

module.exports = Users;
