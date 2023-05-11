const express = require('express');
const { userIndex } = require('./user-routes/user.index');
const { authIndex } = require('./auth-routes/auth.index');
const allRouter = express.Router();

allRouter.use("/", userIndex);
allRouter.use("/", authIndex)

module.exports = { allRouter };
