const express = require('express')
const router = express.Router();
const QuizController = require('../../controllers/resource/quiz.controller');
const checkAdminRole = require('../../middleware/checkAdminRole')

router
    .get('/', QuizController.findAll)
    .get('/:id', QuizController.findOne);

router
    .post('/', QuizController.create, checkAdminRole)
    .put('/:id', QuizController.update, checkAdminRole)
    .delete('/:id',QuizController.delete, checkAdminRole);

module.exports = router