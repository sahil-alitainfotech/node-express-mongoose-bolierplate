const AUTH_MESSAGES = {
    LOGIN_SUCCESSFUL: "Log-in successfull.",
    LOGIN_FAILED: "Log-in failed.",
    LOGOUT_SUCCESSFUL: "Log-out successfull.",
    LOGOUT_FAILED: "Log-out failed.",
    USER_NOT_FOUND: "User does not exists sorry.",
    LOGIN_UN_SUCCESSFUL_WITHOUT_PASSWORD:
        "Please set your password before logging in.",

    INVALID_CREDENTIALS: "Invalid Credentials.",
    INVITE_SENT: "Invitation sent successfully.",
    EMAIL_CODE_SENT: "Invite code has been sent to you via mail please accept.",
    EMAIL_CODE_NOT_SENT: "Issue sending invitation.",
    URL_CORRECT: "Your Link to reset password is valid.",
    URL_EXPIRED: "Your Link to reset password is expired.",
    LINK_INCORRECT: "Your Link to reset password is incorrect.",
    INVITE_URL_CORRECT: "Your Link to set password is valid.",

    INVITE_URL_EXPIRED: "Your invitation code is expired.",
    INVITE_LINK_INCORRECT: "Your invitation code is incorrect.",
    EMAIL_SENT:
        " 👍Check your mail box the link has been shared to change password 😊🤩.",

    PASSWORD_RESET_SUCCESSFULLY: "Reset password successfull.",
    PASSWORD_RESET_UN_SUCCESSFULLY: "Can not reset password.",
    CURRENT_PASSWORD_INVALID: "Current password is invalid",
    INITIAL_PASSWORD_SETUP_SUCCESS: "Password setup successfull",
    INITIAL_PASSWORD_SETUP_ERROR: "Password setup un-successfull",


    EMAIL_ERROR_MISSING: "Email is missing.",
    EMAIL_ERROR_EMPTY: "Email is empty.",
    EMAIL_ERROR_INVALID: "Invalid email address.",
    EMAIL_UNIQUE: "Email must be unique",

    NAME_MISSING: "Name is missing",
    NAME_EMPTY: "Name is empty",

    PASSWORD_ERROR_MISSING: "Password is missing",
    PASSWORD_ERROR_EMPTY: "Password is empty",
    PASSWORD_LENGTH: "Password min length",

    TOKEN_INVALID: "Your token is invalid",
    TOKEN_REQUIRED: "Please enter the valid token",
};

module.exports = { AUTH_MESSAGES };
