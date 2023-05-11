const express = require("express");
const { allController } = require("../../controller");
const { registerValidationRules } = require("../../validation_rules/registerUser.validation");
const validateApi = require("../../middlewares/validator");
const userRouter = express.Router();

userRouter.post('/register', registerValidationRules(), validateApi, allController.userController.register)

module.exports = { userRouter };
