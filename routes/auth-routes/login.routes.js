const express = require('express')
const { allController } = require('../../controller')
const validateApi = require('../../middlewares/validator')
const { loginValidationRules } = require('../../validation_rules/auth-validation/login.validation')
const loginRouter = express.Router()

loginRouter.post('/login',loginValidationRules(), validateApi, allController.authController.login)

module.exports = { loginRouter }

