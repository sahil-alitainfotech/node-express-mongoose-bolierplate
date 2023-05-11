const express = require('express')
const { allController } = require('../../controller')
const { resetPasswordValidationRules } = require('../../validation_rules/resetPassword.validation')
const validateApi = require('../../middlewares/validator')
const resetPasswordRouter = express.Router()

resetPasswordRouter.post('/reset-password', resetPasswordValidationRules(), validateApi, allController.authController.resetPassword)

module.exports = { resetPasswordRouter }