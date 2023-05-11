const express = require('express');
const { userRouter } = require('./user.routes');
const userIndex = express.Router();

userIndex.use("/user", userRouter );

module.exports = { userIndex };