const { checkSchema } = require("express-validator");
const { AUTH_MESSAGES } = require("../../controller-messages/auth.messages");

const resetPasswordValidationRules = () => {
  return checkSchema({
    reset_password_token: {
      notEmpty: {
        errorMessage: AUTH_MESSAGES.TOKEN_REQUIRED,
      },
    },
    new_password: {
      notEmpty: {
        errorMessage: AUTH_MESSAGES.PASSWORD_ERROR_EMPTY,
      },
      matches: {
        options: [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/],
        errorMessage: AUTH_MESSAGES.IN_VALID_PASSWORD_TYPE,
      },
    },
  });
};

module.exports = { resetPasswordValidationRules };
