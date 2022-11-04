const {UUID, DataTypes} = require('sequelize');
const {sequelize} = require('../../config/database');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    password:{
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    }
},
    {
        timestamps: true
    })
module.exports = User;