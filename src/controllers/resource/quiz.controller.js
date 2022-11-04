const quiz = require('../../models/resource/Quiz.model');
const {Op, or} = require('sequelize');
// const association = require('../models/index')

exports.create = async (req, res) => {
    try{
        const createQuiz = await quiz.create(req.body)
        res.status(200).json(createQuiz)
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"})
    }
}
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
        const getQuiz = await quiz.findAndCountAll({
            attributes: ['id','title','description'],
            limit: size,
            offset: (page - 1) * size,
            where: {
                isDeleted: false,
                title : {
                    [Op.like]: `%${req.query.title  === undefined ? '': req.query.title}%`
                },
            },
            isDeleted: false,
        });
        res.status(200).json({
            Page: page,
            itemPerAllPage: getQuiz.count,
            totalPage: Math.ceil(getQuiz.count / size),
            content: getQuiz.rows
        })
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"})
    }
}
exports.findOne = async (req, res) => {
    try{
        const {id} = req.params;
        const getQuizById = await quiz.findOne({
            where: {id},
            isDeleted: false
        });
        if(!getQuizById){
            res.status(404).json({
                code: "CODE_Error",
                message: "Not found!!"
            })
        }
        res.status(200).json(getQuizById)
    } catch (e) {
        res.status(400).json({message: "Something is wrong in here"})
    }
}
exports.update = async (req, res) => {
    try{
        const {id} = req.params;
        const updateQuizById = await quiz.findOne({
            where: {id},
            isDeleted: false
        });
        if(!updateQuizById){
            res.status(404).json({
                code: "UNKNOWN_CODE_ERROR",
                message: "Not Found!!!"
            })
        }
        updateQuizById.set(req.body);
        await updateQuizById.save();
        res.status(200).json(updateQuizById);
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"})
    }
}
exports.delete = async (req, res) => {
    try{
        const {id} = req.params;
        const deleteQuizById = await quiz.findOne({
            where: {id},
            isDeleted: false
        })
        if(!deleteQuizById){
            res.status(404).json({
                code: "CODE_ERROR",
                message: "Not Found!!"
            })
        }
        deleteQuizById.set({isDeleted: true})
        await deleteQuizById.save();
        res.status(200).json(deleteQuizById);
    }catch (e) {
        res.status(400).json({message: `Deleted By id: ${id} is successfully`})
    }
}