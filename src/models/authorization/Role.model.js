const {UUID, DataTypes} = require('sequelize');
const {sequelize} = require('../../config/database');

const Role = sequelize.define('role', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    }
})
module.exports = Role;