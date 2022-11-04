const User = require('../../models/authorization/User.model');
const {Op} = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
// const {createToken} = require('../../middleware/verify')
const Role = require('../../models/authorization/Role.model')

exports.register = async (req, res) => {
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const createUser = await User.create({...req.body, password : hashedPassword});
        res.status(200).json(createUser)
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"
        })
    }
};
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
    try{
        const getUser = await User.findAndCountAll({
            attributes: ["id","name","password","email"],
            limit: size,
            offset: (page - 1) * size,
            where: {
                name : {
                    [Op.like]: `%${req.query.name  === undefined ? '': req.query.name}%`
                },
            }
        });
        res.status(200).json({
            Page: page,
            itemPerAllPage: getUser.count,
            totalPage: Math.ceil(getUser.count/size),
            content: getUser.rows
        })
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"
        })
    }
}
exports.findOne = async (req, res) => {
    try{
        const {id} = req.params
        const getUserById = await User.findOne({where: {id}})
        if(!getUserById) {
           res.status(404).json({
               code: "ERROR_CODE",
               message: "Not Found!"
           })
        }
        res.status(200).json(getUserById)
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"
        })
    }
};
exports.update = async (req, res) => {
    try{
        const {name, email} = req.body
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const {id} = req.params;
        const updateUserById = await User.findOne({where: {id}})
        if(!updateUserById) {
            res.status(404).json({
                code: "ERROR_CODE",
                message: "Not Found!"
            })
        }
        updateUserById.set({name, email,password: hashedPassword});
        await updateUserById.save()
        res.status(200).json(updateUserById)
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"
        })
    }
}

exports.delete = async (req, res) => {
    try{
        const {id} = req.params
        const deletedUserById = await User.findOne({where: {id}})
        if(!deletedUserById){
            res.status(404).json({
                code: "ERROR_CODE",
                message: "Not Found!"
            })
        }
        deletedUserById.destroy();
        res.status(200).json(`deleted By id:${id} is successfully`)
    } catch (e) {
        res.status(400).json({
            code: "UNKNOWN_CODE",
            message: "Something is wrong in here"
        })
    }
}
exports.signIn = async (req, res) => {
        const {email, password} = req.body
        const getUserByUserEmail = await User.findOne({
            where: {email: email},
            include: Role
        });
        if(!email) res.status(404).json({message: "Not Found"})
        const dbPassword = getUserByUserEmail.password;
        bcrypt.compare(password, dbPassword).then((match)=> {
            if(!match){
                res.status(400).json({error: "Wrong Email and Password Combination!"})
            } else {
                const roles = getUserByUserEmail.roles.map(role => role.name);
                const accessToken = jwt.sign({ getUserByUserEmail, roles }, 'secretkey', {expiresIn: '30m'})
                res.status(200).json({
                    message: "Logged In", accessToken, roles
                })
            }
        })
}
