const express = require('express')
const { allController } = require('../../controller')
const validateApi = require('../../middlewares/validator')
const { resetPasswordValidationRules } = require('../../validation_rules/auth-validation/resetPassword.validation')
const resetPasswordRouter = express.Router()

resetPasswordRouter.post('/reset-password',resetPasswordValidationRules() , validateApi, allController.authController.resetPassword)

module.exports = { resetPasswordRouter }