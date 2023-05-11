const express = require('express')
const { allController } = require('../../controller')

const checkResetTokenRouter = express.Router()

checkResetTokenRouter.get("/check-reset-password", allController.authController.checkResetPasswordToken)

module.exports = { checkResetTokenRouter }