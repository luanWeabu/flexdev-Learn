const {UUID, DataTypes, UUIDV4} = require('sequelize');
const {sequelize} = require('../../config/database');

const Question = sequelize.define('question', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        unique: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    timestamps: true
})
module.exports = Question;
