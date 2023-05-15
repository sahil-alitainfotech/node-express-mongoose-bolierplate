const express = require('express');
const { userIndex } = require('./user-routes/user.index');
const { authIndex } = require('./auth-routes/auth.index');
const { groupIndex } = require('./group-routes/group.index');
const allRouter = express.Router();

allRouter.use("/", userIndex);
allRouter.use("/", authIndex)
allRouter.use("/", groupIndex)

module.exports = { allRouter };
