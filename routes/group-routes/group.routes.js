const express = require('express')
const auth = require('../../middlewares/auth.guard')
const { allController } = require('../../controller')
const validateApi = require('../../middlewares/validator')
const { createGroupValidationRules } = require('../../validation_rules/group-validation/createGroup.validation')
const { updateGroupValidationRules } = require('../../validation_rules/group-validation/updateGroup.validation')

const groupRouter = express.Router()

groupRouter.post('/create-group', createGroupValidationRules(), validateApi, auth, allController.groupController.createGroup)

groupRouter.get('/get-group/:id', auth, allController.groupController.getGroup)

groupRouter.get('/get-all-group', auth, allController.groupController.getAllGroup)

groupRouter.put('/update-group/:id', updateGroupValidationRules(), validateApi, auth, allController.groupController.updateGroup)

groupRouter.delete('/delete-group/:id', auth, allController.groupController.deleteGroup)

groupRouter.delete('/del-group/:id', auth, allController.groupController.deleteGroupById)

module.exports = { groupRouter }