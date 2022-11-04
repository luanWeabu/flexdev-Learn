const topic = require('../../models/resource/Topic.model');
const topicQuestion = require('../../models/resource/TopicQuestion.model');
const Question = require('../../models/resource/Question.model');

exports.createAllTopicQuestion = async (req, res) => {
    try{
        const createTopicQuestion = await topicQuestion.create(req.body);
        res.status(200).json(createTopicQuestion)
    } catch (e) {
        res.status(400).json({message: "Something is wrong in here"})
    }
}

exports.findAllTopicQuestion = async (req, res) => {
    try{
        // await topic.addQuestion(Question,{through: {selfGranted: false}})
        const getTopicQuestion = await topic.findAll(
            {
            where: {isDeleted: false},
            attributes: ['id','name','description'],
            include: [{
                where: {isDeleted: false},
                model: Question,
                attributes: ['id','title'],
                through: {
                    attributes: []
                }
            }],
        }
        )
        res.status(200).json(getTopicQuestion)
    } catch (e) {
        res.status(400).json({message: "Something is wrong in here"})
    }
}
exports.deleteTopicQuestion = async (req, res) => {
    try{
        const {topicId, questionId} = req.query
        const deleteTopicQuestion = await topicQuestion.findOne(
            {where: {topicId, questionId}}
        )
        if(!deleteTopicQuestion){
            res.status(404).json({
                Code: "UNKNOWN_CODE",
                Message: "Not Found!!!"
            })
        }
        deleteTopicQuestion.destroy();
        res.status(200).json("deleted successfully");
    } catch (e) {
        res.status(400).json({message: "Something is wrong in here"})
    }
}