const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/authorization/role.controller');
const checkAdminRole = require('../../middleware/checkAdminRole')

router.get('/',roleController.findAll, checkAdminRole);
router.post('/',roleController.create, checkAdminRole);

module.exports = router