const { authController } = require("./auth-controller/auth.index");
const { groupController } = require("./group-controller/group.index");
const { userController } = require("./user-controller/user.index");

const allController = {
    userController,
    authController,
    groupController
}

module.exports = { allController };