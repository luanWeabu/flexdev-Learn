const Answer = require('../../models/resource/Answer.model');
const {Op} = require('sequelize');

exports.create = async (req, res) => {
    try{
        const createAnswer = await Answer.create(req.body);
        res.status(200).json(createAnswer)
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"
        })
    }
};
exports.findAll = async (req, res) => {
    try{
        const getAnswer = await Answer.findAll({where: {isDeleted: false}});
        res.status(200).json(getAnswer)
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"})
    }
};
exports.findOne = async (req, res) => {
    try{
        const {id} = req.params;
        const getAnswerById = await Answer.findOne({
            where: {id},
            isDeleted: false
        });
        if(!getAnswerById){
            res.status(404).json({
                code: "CODE_Error",
                message: "Not found!!"
            })
        }
        res.status(200).json(getAnswerById)
    } catch (e) {
        res.status(400).json({message: "Something is wrong in here"})
    }
};
exports.update = async (req, res) => {
    try{
        const {id} = req.params;
        const updateAnswerById = await Answer.findOne({
            where: {id},
            isDeleted: false
        });
        if(!updateAnswerById){
            res.status(404).json({
                code: "UNKNOWN_CODE_ERROR",
                message: "Not Found!!!"
            })
        }
        updateAnswerById.set(req.body);
        await updateAnswerById.save();
        res.status(200).json(updateAnswerById);
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"})
    }
};
exports.delete = async (req, res) => {
    try{
        const {id} = req.params;
        const deleteAnswerById = await Answer.findOne({
            where: {id},
            isDeleted: false
        })
        if(!deleteAnswerById){
            res.status(404).json({
                code: "CODE_ERROR",
                message: "Not Found!!"
            })
        }
        deleteAnswerById.set({isDeleted: true})
        await deleteAnswerById.save();
        res.status(200).json(deleteAnswerById);
    }catch (e) {
        res.status(400).json({message: `Deleted By id: ${id} is successfully`})
    }
}