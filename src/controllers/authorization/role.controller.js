const Role = require('../../models/authorization/Role.model');

exports.create = async (req, res) => {
    try{
        const createRole = await Role.create(req.body);
        res.status(200).json(createRole)
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"
        })
    }
}
exports.findAll = async (req, res) => {
    try{
        const getRole = await Role.findAll();
        res.status(200).json(getRole)
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"
        })
    }
}