const express = require('express')
const { allController } = require('../../controller')
const { loginValidationRules } = require('../../validation_rules/login.validation')
const validateApi = require('../../middlewares/validator')
const loginRouter = express.Router()

loginRouter.post('/login', loginValidationRules(), validateApi, allController.authController.login)

module.exports = { loginRouter }

