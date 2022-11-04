const { UUID, DataTypes} = require('sequelize');
const { sequelize } = require('../../config/database');

const QuizType = sequelize.define('quiz_type', {
    id: {
       type: DataTypes.UUID,
       primaryKey: true,
       defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, 
    {
        timestamp: true
    }
);
module.exports = QuizType;