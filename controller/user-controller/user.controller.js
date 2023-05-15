const bcrypt = require('bcrypt')
const User = require('../../schema/user.schema');
const {
    RESPONSE_PAYLOAD_STATUS_SUCCESS,
    RESPONSE_STATUS_CODE_OK,
    RESPONSE_PAYLOAD_STATUS_ERROR,
    RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR,
    RESPONSE_STATUS_CODE_NOT_FOUND,
    RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
    AUTH_USER_DETAILS
} = require("../../constants/global.constants");
const { USER_MESSAGES } = require('../../controller-messages/user.messages');
const { forgotPasswordMailer, loginMassageMailer } = require('../../services/mailer/login.forgot.mailer');

// add login token

const addLogInToken = async (token, id) => {

    try {
        let user = await User.findOneAndUpdate({ _id: id }, { $set: { token: token } });
        await loginMassageMailer(user.email)
    }
    catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        };
        return res
            .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
            .json(responsePayload);
    }
};

// add reset password token

const addResetPasswordToken = async (token, email) => {

    try {
        const dt = new Date();
        dt.setHours(dt.getHours() + 2);
        await forgotPasswordMailer(token, email)
        return User.findOneAndUpdate({ email: email },
            {
                reset_password_token: token,
                reset_password_expiry_time: dt,
            }
        );
    }
    catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        };
        return res
            .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
            .json(responsePayload);
    }
};

// user addUser

const addUser = async (req, res) => {

    try {
        const { first_name, last_name, email, password } = req.body;
        const newPassword = await bcrypt.hash(password, 12)
        const addUser = await User.create({
            first_name,
            last_name,
            email,
            password: newPassword
        })
        if (addUser) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: USER_MESSAGES.USERS_ADDED,
                data: addUser,
                error: null
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
        }
        else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: null,
                data: null,
                error: USER_MESSAGES.USERS_NOT_ADDED,
            }
            return res.status(RESPONSE_STATUS_CODE_NOT_FOUND).json(responsePayload)
        }
    }
    catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: err.message,
        }
        return res
            .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
            .json(responsePayload)
    }
}

// get user

const getUser = async (req, res) => {

    try {
        const { _id } = req[AUTH_USER_DETAILS]
        const user = await User.findOne({ _id })
        if (user) {
            const userObj = user.toJSON()
            delete userObj.password
            delete userObj.reset_password_token
            delete userObj.token
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: USER_MESSAGES.USERS_FOUND,
                data: userObj,
                error: null
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
        }
        else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: USER_MESSAGES.USERS_NOT_FOUND,
                data: null,
                error: null,
            }
            return res.status(RESPONSE_STATUS_CODE_NOT_FOUND).json(responsePayload)
        }
    }
    catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        }
        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload)
    }
}

// get all user

const getAllUser = async (req, res) => {

    try {
        const user = await User.find()
        if (user) {
            delete user.password
            delete user.reset_password_token
            delete user.token
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: USER_MESSAGES.USERS_FOUND,
                data: user,
                error: null
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
        }
        else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: USER_MESSAGES.USERS_NOT_FOUND,
                data: null,
                error: null,
            }
            return res.status(RESPONSE_STATUS_CODE_NOT_FOUND).json(responsePayload)
        }
    }
    catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        }
        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload)
    }
}

// update user

const updateUser = async (req, res) => {

    try {
        const { _id } = req[AUTH_USER_DETAILS]
        const { first_name, last_name } = req.body;
        const updateUser = await User.findOneAndUpdate({ _id }, {
            first_name,
            last_name,
        }, { new: true }
        )
        if (updateUser) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: USER_MESSAGES.USERS_UPDATED,
                data: updateUser,
                error: null
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
        }
        else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: null,
                data: null,
                error: USER_MESSAGES.USERS_NOT_UPDATED,
            }
            return res.status(RESPONSE_STATUS_CODE_NOT_FOUND).json(responsePayload)
        }
    }
    catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        }
        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload)
    }
}

// delete user find by id and update

const deleteUserById = async (req, res) => {

    try {
        const { id } = req.params
        const { _id } = req[AUTH_USER_DETAILS]

        const deleteUser = await User.findByIdAndUpdate(id, {
            is_deleted: true,
            deleted_by: _id,
            updated_by: _id,
            token: null,
        })
        if (deleteUser) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: USER_MESSAGES.USER_DELETED,
                data: deleteUser,
                error: null
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
        }
        else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: null,
                data: null,
                error: USER_MESSAGES.USER_NOT_DELETED,
            }
            return res.status(RESPONSE_STATUS_CODE_NOT_FOUND).json(responsePayload)
        }
    }
    catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        }
        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload)
    }
}

// delete user find by id and delete

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const deleteUser = await User.findByIdAndDelete(id)
        if (deleteUser) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: USER_MESSAGES.USER_DELETED,
                data: deleteUser,
                error: null
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
        }
        else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: null,
                data: null,
                error: USER_MESSAGES.USER_NOT_DELETED,
            }
            return res.status(RESPONSE_STATUS_CODE_NOT_FOUND).json(responsePayload)
        }
    }
    catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        }
        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload)
    }
}

module.exports = {
    addUser,
    addLogInToken,
    addResetPasswordToken,
    getUser,
    updateUser,
    deleteUserById,
    getAllUser,
    deleteUser
}