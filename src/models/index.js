const {Model} = require('sequelize');
const topic = require('./resource/Topic.model');
const quiz = require('./resource/Quiz.model');
const quizType = require('./resource/QuizType.model');
const topicQuestion = require('./resource/TopicQuestion.model');
const question = require('./resource/Question.model')
const answer = require('./resource/Answer.model');
const quizQuestion = require('./resource/QuizQuestion.model')
const user = require('./authorization/User.model');
const role = require('./authorization/Role.model');
const userRole = require('./authorization/UserRole.model');;

/**
 * Using beLongsToMany
 *  many User  has many role relationship* through topicQuestion
 *  many role has many user relationship through topicQuestion
 */
user.belongsToMany(role, {through: userRole});
role.belongsToMany(user, {through: userRole})

/**
 * Using beLongsToMany
 *  many Topic  has many question relationship* through topicQuestion
 *  many Question has many topic relationship through topicQuestion
 */
topic.belongsToMany(question, {through: topicQuestion})
question.belongsToMany(topic, {through: topicQuestion})

/**
 *  Using one to many / one to one
 *  a questions has many answer relationship
 *  a answer has one question relationship
 */
question.hasMany(answer);
answer.belongsTo(question);

/**
 * Using hasMany / belongsto
 * a quizType has many quiz
 * a quiz has one quizType
 */
quizType.hasMany(quiz);
quiz.belongsTo(quizType);

/**
 * Using belongsToMany
 *  many quiz has many question through quizQuestion
 *  many question has many quiz through quizQuestion
 */
quiz.belongsToMany(question, {through: quizQuestion});
question.belongsToMany(quiz, {through: quizQuestion});
