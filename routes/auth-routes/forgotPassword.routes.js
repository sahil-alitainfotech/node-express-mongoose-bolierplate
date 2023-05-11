const express = require('express')
const { forgotPasswordValidationRules } = require('../../validation_rules/forgotPassword.validation')
const validateApi = require('../../middlewares/validator')
const { allController } = require('../../controller')
const forgotPasswordRouter = express.Router()

forgotPasswordRouter.post('/forgot-password', forgotPasswordValidationRules(), validateApi, allController.authController.forgotPassword)

module.exports = { forgotPasswordRouter }