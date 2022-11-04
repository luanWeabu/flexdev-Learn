const express = require('express');
const router = express.Router();
const questionController = require('../../controllers/resource/question.controller');
const checkAdminRole = require('../../middleware/checkAdminRole');

router
    .get('/',questionController.findAll)
    .get('/:id',questionController.findOne);

router
    .post('/',questionController.create, checkAdminRole)
    .put('/:id',questionController.update, checkAdminRole)
    .delete('/',questionController.delete, checkAdminRole);

module.exports = router;