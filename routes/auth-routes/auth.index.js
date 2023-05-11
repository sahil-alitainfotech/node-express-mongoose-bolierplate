const express = require('express')
const { forgotPasswordRouter } = require('./forgotPassword.routes')
const { loginRouter } = require('./login.routes')
const { resetPasswordRouter } = require('./resetPassword.routes')
const { checkResetTokenRouter } = require('./checkResetToken.routes')
const authIndex = express.Router()

authIndex.use("/auth", loginRouter)
authIndex.use("/auth", forgotPasswordRouter)
authIndex.use("/auth", resetPasswordRouter)
authIndex.use("/auth", checkResetTokenRouter)

module.exports = { authIndex }