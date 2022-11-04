const {UUID, DataTypes} = require('sequelize');
const {sequelize} = require('../../config/database');
const topic = require('./Topic.model');
const question = require('./Question.model');

const TopicQuestion = sequelize.define('topic_question',{
    topicId : {
        type: DataTypes.INTEGER,
        references: {
            model: topic,
            key: 'id'
        }
    },
    questionId: {
        type: DataTypes.INTEGER,
        references: {
            model: question,
            key: 'id'
        }
    }
},{timestamps: false} );

module.exports = TopicQuestion;

