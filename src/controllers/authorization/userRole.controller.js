const User = require('../../models/authorization/User.model');
const Role = require('../../models/authorization/Role.model');
const UserRole = require('../../models/authorization/UserRole.model');

exports.create = async (req, res) => {
    try{
        const createUserRole = await UserRole.create(req.body);
        res.status(200).json(createUserRole)
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"
        })
    }
}
exports.findAll = async (req, res) => {
    try{
        const getUserRole = await User.findAll({
            attributes: ["id","name","password","email"],
            include: [{
                model: Role,
                attributes: ["id","name"],
                through: {
                    attributes: []
                }
            }]
        });
        res.status(200).json(getUserRole)
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"
        })
    }
}
