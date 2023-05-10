const express = require('express');
const { userIndex } = require('./user-routes/user.index');
const allRouter = express.Router();

allRouter.use("/", userIndex);

module.exports = { allRouter };
