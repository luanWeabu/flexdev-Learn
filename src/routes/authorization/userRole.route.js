const express = require('express');
const router = express.Router();
const userRoleController = require('../../controllers/authorization/userRole.controller');
const checkAdminRole = require('../../middleware/checkAdminRole')


router.get('/',userRoleController.findAll, checkAdminRole);
router.post('/',userRoleController.create, checkAdminRole);


module.exports = router