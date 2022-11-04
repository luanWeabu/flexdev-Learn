const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/authorization/user.controller');
const verifyToken = require('../../middleware/verify');
const checkAdminRole = require("../../middleware/checkAdminRole");

router
    .get('/', UserController.findAll)
    .post('/', UserController.register);

router
    .get('/:id', UserController.findOne, checkAdminRole)
    .patch('/:id',UserController.update, checkAdminRole)
    .delete('/:id',UserController.delete, checkAdminRole)

module.exports = router;