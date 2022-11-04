const express = require('express');
const router = express.Router();
const answerController = require('../../controllers/resource/answer.controller');
const checkAdminRole = require('../../middleware/checkAdminRole')

router
    .get('/', answerController.findAll)
    .get('/:id',answerController.findOne)


router
    .post('/',answerController.create, checkAdminRole)
    .put('/:id', answerController.update, checkAdminRole)
    .delete('/:id', answerController.delete, checkAdminRole);

module.exports = router;