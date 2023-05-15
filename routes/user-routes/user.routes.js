const express = require("express");
const { allController } = require("../../controller");
const validateApi = require("../../middlewares/validator");
const auth = require("../../middlewares/auth.guard");
const { updateUserValidationRules } = require("../../validation_rules/user-validation/updateUser.validation");
const { addUserValidationRules } = require("../../validation_rules/user-validation/addUser.validation");
const userRouter = express.Router();

userRouter.post('/addUser', addUserValidationRules(), validateApi, allController.userController.addUser)

userRouter.get('/getUser', auth, allController.userController.getUser)

userRouter.get('/get-all-user', allController.userController.getAllUser)

userRouter.put('/update-user', updateUserValidationRules(), validateApi, auth, allController.userController.updateUser)

userRouter.delete('/delete-user/:id', auth, allController.userController.deleteUserById)

userRouter.delete('/del-user/:id', auth, allController.userController.deleteUser)


module.exports = { userRouter };
