const express = require('express')
const validateApi = require('../../middlewares/validator')
const { allController } = require('../../controller')
const { forgotPasswordValidationRules } = require('../../validation_rules/auth-validation/forgotPassword.validation')
const forgotPasswordRouter = express.Router()

forgotPasswordRouter.post('/forgot-password',forgotPasswordValidationRules() , validateApi, allController.authController.forgotPassword)

module.exports = { forgotPasswordRouter }