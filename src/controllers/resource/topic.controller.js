const Topic = require('../../models/resource/Topic.model');
const {Op} = require("sequelize");
exports.create = async (req, res) => {
    try{
        const createTopic = await Topic.create(req.body);
        res.status(200).json(createTopic)
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"
        })
    }
};
/**
 * Pagination sequelize topic
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.findAll = async (req, res) => {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeOfNumber = Number.parseInt(req.query.size);
    let page = 1;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
        page = pageAsNumber;
    }
    let size = 10;
    if(!Number.isNaN(sizeOfNumber) && sizeOfNumber > 0){
        size = sizeOfNumber;
    }
    // const {id, name} = req.params
    try{
        const getTopic = await Topic.findAndCountAll({
            attributes: ['id','name','description'],
            limit: size,
            offset: (page - 1) * size,
            where: {
                isDeleted: false,
                name : {
                    [Op.like]: `%${req.query.name  === undefined ? '': req.query.name}%`
                },
            }
        });
        res.status(200).json({
            Page: page,
            itemPerAllPage: getTopic.count,
            totalPage: Math.ceil(getTopic.count / size),
            content: getTopic.rows
        })
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"
        })
    }
};
/**
 * search name Topic in table topics
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.findOne = async (req, res) => {
    try{
        const {id} = req.params
        const getATopic = await Topic.findOne({
            where: {id},
            isDeleted: false
        })
        if(!getATopic){
            res.status(404).json("Not Found in here ")
        }
        res.status(200).json(getATopic)
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"})
    }
};
exports.update = async (req, res) => {
    try{
        const {id} = req.params;
        const updateTopic = await Topic.findOne({
            where: {id},
            isDeleted: false
        })
        if(!updateTopic){
            res.status(404).json({message : "Not Found id in here"})
        }
        updateTopic.set(req.body);
        const topic = await updateTopic.save();
        res.status(200).json(topic)
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"
        })
    }
}
exports.delete = async (req, res) => {
    try{
        const {id} = req.params;
        const deleteTopicById = await Topic.findOne({
            where: {id},
            isDeleted: false
        });
        if(!deleteTopicById){
            res.status(404).json({message: "Not found id in here"})
        }
        deleteTopicById.set({isDeleted: true});
        const setDeletedTopicById = await deleteTopicById.save();
        res.status(200).json(setDeletedTopicById)
    }catch (e) {
        res.status(500).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"
        })
    }
}

