const express = require('express');
const router = express.Router();
const topicQuestionController = require('../../controllers/resource/topicQuestion.controller');
const checkAdminRole = require('../../middleware/checkAdminRole')


router.get('/',topicQuestionController.findAllTopicQuestion);

router
    .post('/',topicQuestionController.createAllTopicQuestion,checkAdminRole)
    .delete('/',topicQuestionController.deleteTopicQuestion, checkAdminRole);

module.exports = router;