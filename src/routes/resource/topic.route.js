const express = require('express');
const router = express.Router();
const topicController = require('../../controllers/resource/topic.controller');
const checkAdminRole = require('../../middleware/checkAdminRole')

// Routes
router.get('/', topicController.findAll);
router.get('/:id', topicController.findOne);

router
    .post('/', topicController.create,checkAdminRole)
    .put('/:id',topicController.update,checkAdminRole)
    .delete('/:id', topicController.delete,checkAdminRole);

module.exports = router;