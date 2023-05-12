const { checkSchema } = require("express-validator");
const { AUTH_MESSAGES } = require("../controller-messages/auth.messages");
const {t} = require("../helpers/i18n")

const forgotPasswordValidationRules = () => {
  return checkSchema({
    email: {
      notEmpty: {
        errorMessage: t("EMAIL_ERROR_EMPTY","en"),
      },
      isEmail: {
        errorMessage: t("EMAIL_ERROR_INVALID","en"),
      },
    },
  });
};

module.exports = { forgotPasswordValidationRules };
