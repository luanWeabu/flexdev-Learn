const {UUID, DataTypes} = require('sequelize');
const {sequelize} = require('../../config/database');
const User = require('./User.model');
const Role = require('./Role.model');

const UserRole = sequelize.define('user_role', {
    userId:{
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id'
        }
    }
},{
    timestamps: false
    })
module.exports = UserRole;