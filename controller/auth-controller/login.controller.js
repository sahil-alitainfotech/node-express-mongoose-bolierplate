const { RESPONSE_PAYLOAD_STATUS_SUCCESS,
    RESPONSE_STATUS_CODE_OK,
    RESPONSE_PAYLOAD_STATUS_ERROR,
    RESPONSE_STATUS_CODE_NOT_FOUND,
    RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
    RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR } = require("../../constants/global.constants")
const { AUTH_MESSAGES } = require("../../controller-messages/auth.messages")
const { comparePasswordHash } = require("../../helpers/fn")
const User = require("../../schema/user.schema")
const authService = require("../../services/auth.service")
const { addLogInToken } = require("../user-controller/user.controller")

// login

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({
            email: { $regex: email, $options: "i" },
        })
        if (user) {
            if (user.password !== null) {
                const passwordHash = user.password
                const isValidPassword = await comparePasswordHash(password, passwordHash)
                if (isValidPassword) {
                    const userObj = user.toJSON();
                    delete userObj.password;
                    delete userObj.token;
                    delete userObj.reset_password_expiry_time;
                    delete userObj.reset_password_token
                    const tokenObj = {
                        _id: userObj._id,
                        email: userObj.email,
                        name: userObj.name,
                    };
                    const token = authService.generateToken(tokenObj);
                    await addLogInToken(token, userObj._id);
                    await User.findOneAndUpdate({ email: email }, { last_login: new Date() });
                    const responsePayload = {
                        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                        message: AUTH_MESSAGES.LOGIN_SUCCESSFUL,
                        data: { token: token, userObj },
                        error: null,
                    };
                    return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
                }
                else {
                    const responsePayload = {
                        status: RESPONSE_PAYLOAD_STATUS_ERROR,
                        message: AUTH_MESSAGES.INVALID_CREDENTIALS,
                        data: null,
                        error: AUTH_MESSAGES.INVALID_CREDENTIALS,
                    };
                    return res.status(RESPONSE_STATUS_CODE_NOT_FOUND).json(responsePayload);
                }
            }
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
}

module.exports = { login }