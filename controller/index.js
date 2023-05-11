const { authController } = require("./auth-controller/auth.index");
const { userController } = require("./user-controller/user.index");

const allController = {
    userController,
    authController
}

module.exports = { allController };