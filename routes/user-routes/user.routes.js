const express = require("express");
const { allController } = require("../../controller");
const userRouter = express.Router();

userRouter.post('/adduser', allController.userController.addUsers)
module.exports = { userRouter };
