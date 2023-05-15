const express = require('express')
const { groupRouter } = require('./group.routes')

const groupIndex = express.Router()

groupIndex.use("/group", groupRouter)

module.exports = { groupIndex }