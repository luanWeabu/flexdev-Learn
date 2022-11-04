const quiz = require('../../models/resource/Quiz.model');
const Question = require('../../models/resource/Question.model');
const quizQuestion = require('../../models/resource/QuizQuestion.model');

exports.createQuizQuestion = async (req, res) => {
    try{
        const createQuizQuestion = await quizQuestion.create(req.body)
        res.status(200).json(createQuizQuestion)
    } catch (e) {
        res.status(400).json({
            message: "Something is wrong in here"
        })
    }
}

exports.findAllQuizQuestion = async (req, res) => {
    try{
        const getQuizQuestion = await quiz.findAll({
            where: {isDeleted: false},
            attributes : ['id','title','description','isDeleted'],
            include: [{
                model: Question,
                attributes: ['id','title'],
                through: {
                    attributes: []
                }
            }]
        })
        res.status(200).json(getQuizQuestion)
    } catch (e) {
        res.status(400).json({
            message:" Something is wrong in here"
        })
    }
}

exports.deletequizQuestion = async (req, res) => {
    try{
        const {quizId, questionId} = req.query
        const deleteQuizQuestion = await quizQuestion.findOne(
            {where: {quizId, questionId}}
        )
        if(!deleteQuizQuestion){
            res.status(404).json({
                Code: "UNKNOWN_CODE",
                Message: "Not Found!!!"
            })
        }
        deleteQuizQuestion.destroy();
        res.status(200).json("deleted successfully");
    } catch (e) {
        res.status(400).json({message: "Something is wrong in here"})
    }
}