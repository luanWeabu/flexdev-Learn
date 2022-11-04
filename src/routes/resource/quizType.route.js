const express = require('express');
const router = express.Router();
const quizTypeController = require('../../controllers/resource/quizType.controller');
const checkAdminRole = require('../../middleware/checkAdminRole')

router
    .get('/', quizTypeController.findAll)
    .get('/:id', quizTypeController.findOne);

router
    .post('/', quizTypeController.create, checkAdminRole)
    .put('/:id', quizTypeController.update,checkAdminRole)
    .delete('/:id', quizTypeController.delete,checkAdminRole);

module.exports = router;
