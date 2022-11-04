const express = require('express');
const router = express.Router();
const quizQuestionController = require('../../controllers/resource/quizQuestion.controller')
const checkAdminRole = require('../../middleware/checkAdminRole')

router.get('/', quizQuestionController.findAllQuizQuestion);

router
    .post('/',quizQuestionController.createQuizQuestion, checkAdminRole)
    .delete('/',quizQuestionController.deletequizQuestion, checkAdminRole);

module.exports = router;