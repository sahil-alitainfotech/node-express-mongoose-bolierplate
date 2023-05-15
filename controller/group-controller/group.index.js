const { createGroup, updateGroup, deleteGroup, getGroup, deleteGroupById, getAllGroup } = require("./group.controller");

const groupController = {
    createGroup,
    updateGroup,
    deleteGroup,
    deleteGroupById,
    getGroup,
    getAllGroup
}

module.exports = { groupController }