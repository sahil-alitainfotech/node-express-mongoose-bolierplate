const { RESPONSE_PAYLOAD_STATUS_SUCCESS, RESPONSE_STATUS_CODE_OK, RESPONSE_PAYLOAD_STATUS_ERROR, RESPONSE_STATUS_CODE_NOT_FOUND, RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR, RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR } = require("../../constants/global.constants");
const { AUTH_MESSAGES } = require("../../controller-messages/auth.messages");
const User = require("../../schema/user.schema");
const bcrypt = require('bcrypt')

// reset password

const resetPassword = async (req, res) => {
    try {
        const { reset_password_token, new_password } = req.body;
        const user = await User.findOneAndUpdate(
            {
                reset_password_token: reset_password_token,
            },
            {
                password: await bcrypt.hash(new_password, 12),
                reset_password_token: null,
            }
        );
        if (user) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: AUTH_MESSAGES.PASSWORD_RESET_SUCCESSFULLY,
                data: null,
                error: null,
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: AUTH_MESSAGES.TOKEN_INVALID,
                data: null,
                error: AUTH_MESSAGES.TOKEN_INVALID,
            };
            return res.status(RESPONSE_STATUS_CODE_NOT_FOUND).json(responsePayload);
        }
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


module.exports = { resetPassword }