const { addUser, getUser, updateUser, deleteUserById, getAllUser, deleteUser } = require("./user.controller");

const userController = {
    addUser,
    getUser,
    updateUser,
    deleteUserById,
    getAllUser,
    deleteUser
}

module.exports = { userController };