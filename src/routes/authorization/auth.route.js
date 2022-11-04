const express = require('express');
const userController = require('../../controllers/authorization/user.controller')
const app = express.Router();

app.post('/api/login', userController.signIn)

module.exports = app;
