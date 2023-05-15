const { checkSchema } = require("express-validator");
const { AUTH_MESSAGES } = require("../../controller-messages/auth.messages");

const forgotPasswordValidationRules = () => {
  return checkSchema({
    email: {
      notEmpty: {
        errorMessage: AUTH_MESSAGES.EMAIL_ERROR_EMPTY,
      },
      isEmail: {
        errorMessage: AUTH_MESSAGES.EMAIL_ERROR_INVALID,
      },
    },
  });
};

module.exports = { forgotPasswordValidationRules };
