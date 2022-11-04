const {UUID, DataTypes} = require('sequelize');
const { sequelize } = require('../../config/database');

const Topic = sequelize.define('topic', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    description: {
        type: DataTypes.STRING
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        default: false
    }
},
    {
    timestamps: true
}
);
module.exports = Topic;