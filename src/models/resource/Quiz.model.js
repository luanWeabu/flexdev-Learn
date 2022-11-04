const {UUID , DataTypes} = require('sequelize');
const {sequelize} = require('../../config/database');

const Quiz = sequelize.define('quiz', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },title: {
        type: DataTypes.STRING,
        unique: true
    },
    description: {
        type: DataTypes.STRING
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
},
    {
        timestamps: true
    })
module.exports = Quiz;