const { checkSchema } = require("express-validator");
const { AUTH_MESSAGES } = require("../controller-messages/auth.messages");

const loginValidationRules = () => {
  return checkSchema({
    email: {
      notEmpty: {
        errorMessage: AUTH_MESSAGES.EMAIL_ERROR_EMPTY,
      },
      isEmail: {
        errorMessage: AUTH_MESSAGES.EMAIL_ERROR_INVALID,
      },
    },
    password: {
      isLength: {
        errorMessage: AUTH_MESSAGES.PASSWORD_LENGTH,
        options: { min: 6, max: 15 },
      },
      notEmpty: {
        errorMessage: AUTH_MESSAGES.PASSWORD_ERROR_EMPTY,
      },
    },
  });
};

module.exports = { loginValidationRules };
