const {UUID, DataTypes} = require('sequelize');
const {sequelize} = require('../../config/database')
const quiz = require('./Quiz.model')
const question = require('./Question.model')

const QuizQuestion = sequelize.define('quiz_question',{
    quizId : {
        type: DataTypes.INTEGER,
        references: {
            model: quiz,
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

}, {timestamps: false})

module.exports = QuizQuestion;