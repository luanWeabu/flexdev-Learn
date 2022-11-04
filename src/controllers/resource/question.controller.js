const Question = require('../../models/resource/Question.model');
const {Op} = require('sequelize')

exports.create = async (req, res) => {
    try{
        const createQuestion = await Question.create(req.body);
        res.status(200).json(createQuestion)
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"
        })
    }
};
exports.findAll = async (req, res) => {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    let page = 1;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
    }
    let size = 10;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
        size = sizeAsNumber;
    }
    try{
        // const { id, title} = req.params
        const getQuestion = await Question.findAndCountAll({
            attributes: ['id', 'title'],
            limit: size,
            offset: (page - 1) * size,
            where: {
                isDeleted: false,
                title: {
                    [Op.like]:`%${req.query.title  === undefined ? '': req.query.title}%`
                }
            }
        });
        res.status(200).json({
            Page: page,
            itemPerAllPage: getQuestion.count,
            totalPage: Math.ceil(getQuestion.count / size),
            content: getQuestion.rows
        })
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"})
    }
};
exports.findOne = async (req, res) => {
    try{
        const {id} = req.params;
        const getQuestionById = await Question.findOne({
            where: {id},
            isDeleted: false
        });
        if(!getQuestionById){
            res.status(404).json({
                code: "CODE_Error",
                message: "Not found!!"
            })
        }
        res.status(200).json(getQuestionById)
    } catch (e) {
        res.status(400).json({message: "Something is wrong in here"})
    }
};
exports.update = async (req, res) => {
    try{
        const {id} = req.params;
        const updateQuestionById = await Question.findOne({
            where: {id},
            isDeleted: false
        });
        if(!updateQuestionById){
            res.status(404).json({
                code: "UNKNOWN_CODE_ERROR",
                message: "Not Found!!!"
            })
        }
        updateQuestionById.set(req.body);
        await updateQuestionById.save();
        res.status(200).json(updateQuestionById);
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"})
    }
};
exports.delete = async (req, res) => {
    try{
        const {id} = req.params;
        const deleteQuestionById = await Question.findOne({
            where: {id},
            isDeleted: false
        })
        if(!deleteQuestionById){
            res.status(404).json({
                code: "CODE_ERROR",
                message: "Not Found!!"
            })
        }
        deleteQuestionById.set({isDeleted: true})
        await deleteQuestionById.save();
        res.status(200).json(deleteQuestionById);
    }catch (e) {
        res.status(400).json({message: `Deleted By id: ${id} is successfully`})
    }
}