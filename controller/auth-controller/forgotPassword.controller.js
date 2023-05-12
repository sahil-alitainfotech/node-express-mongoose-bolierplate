const { RESPONSE_PAYLOAD_STATUS_SUCCESS,
    RESPONSE_STATUS_CODE_OK,
    RESPONSE_STATUS_CODE_NOT_FOUND,
    RESPONSE_PAYLOAD_STATUS_ERROR,
    RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
    RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR } = require("../../constants/global.constants");
const { AUTH_MESSAGES } = require("../../controller-messages/auth.messages");
const { USER_MESSAGES } = require("../../controller-messages/user.messages");
const User = require("../../schema/user.schema");
const authService = require("../../services/auth.service");
const { addResetPasswordToken } = require("../user-controller/user.controller");
const { t } = require("../../helpers/i18n")
// forgot password

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const userObj = await User.findOne({ email: email });
        if (userObj) {
            const user = userObj.toJSON();
            const token = authService.generateTokenForgotPassword(email, user.id)
            await addResetPasswordToken(token, email);
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: req.t("EMAIL_SENT"),
                data: token,
                error: null,
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: null,
                data: null,
                error: req.t("USERS_NOT_FOUND"),
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
        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload);
    }
};


module.exports = { forgotPassword }