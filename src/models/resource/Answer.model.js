const {UUID, DataTypes, UUIDV4} = require('sequelize');
const {sequelize} = require('../../config/database');

const Answer = sequelize.define('answer', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    description: {
        type: DataTypes.STRING
    },
    key:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    timestamps: false
})
module.exports = Answer;
