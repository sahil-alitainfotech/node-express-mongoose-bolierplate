const { checkResetPasswordToken } = require("./checkResetToken.controller");
const { forgotPassword } = require("./forgotPassword.controller");
const { login } = require("./login.controller");
const { resetPassword } = require("./resetPassword.controller");

const authController = {
    login,
    forgotPassword,
    resetPassword,
    checkResetPasswordToken
}

module.exports = { authController }