const { RESPONSE_PAYLOAD_STATUS_SUCCESS, RESPONSE_STATUS_CODE_OK, RESPONSE_PAYLOAD_STATUS_ERROR, RESPONSE_STATUS_CODE_NOT_FOUND, RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR, RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR } = require("../../constants/global.constants");
const { AUTH_MESSAGES } = require("../../controller-messages/auth.messages");
const User = require("../../schema/user.schema");

// check reset password token

const checkResetPasswordToken = async (req, res) => {
    try {
        const { token } = req.body;
        const checked = await User.findOne({
            reset_password_token: token,
            reset_password_expiry_time: { $gte: new Date() },
        });
        if (checked) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: AUTH_MESSAGES.URL_CORRECT,
                data: null,
                error: null,
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: null,
                data: null,
                error: AUTH_MESSAGES.LINK_INCORRECT,
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

module.exports = { checkResetPasswordToken };
