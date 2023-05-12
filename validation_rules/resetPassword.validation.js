const { checkSchema } = require("express-validator");
const { AUTH_MESSAGES } = require("../controller-messages/auth.messages");
const { t } = require("i18next");

const resetPasswordValidationRules = () => {
  return checkSchema({
    reset_password_token: {
      notEmpty: {
        errorMessage: t("TOKEN_REQUIRED","en"),
      },
    },
    new_password: {
      notEmpty: {
        errorMessage: t("PASSWORD_ERROR_EMPTY","en"),
      },
      matches: {
        options: [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/],
        errorMessage: AUTH_MESSAGES.IN_VALID_PASSWORD_TYPE,
      },
    },
  });
};

module.exports = { resetPasswordValidationRules };
