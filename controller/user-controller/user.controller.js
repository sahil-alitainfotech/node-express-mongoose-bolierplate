const bcrypt = require('bcrypt')
const User = require('../../schema/user.schema');
const {
    RESPONSE_PAYLOAD_STATUS_SUCCESS,
    RESPONSE_STATUS_CODE_OK,
    RESPONSE_PAYLOAD_STATUS_ERROR,
    RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR,
    RESPONSE_STATUS_CODE_NOT_FOUND,
    RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR
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

// user register

const register = async (req, res) => {
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
module.exports = {
    register,
    addLogInToken,
    addResetPasswordToken
}