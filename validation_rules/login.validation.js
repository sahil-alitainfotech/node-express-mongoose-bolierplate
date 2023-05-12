const { checkSchema } = require("express-validator");
const { AUTH_MESSAGES } = require("../controller-messages/auth.messages");
const { t } = require("i18next");

const loginValidationRules = () => {
  return checkSchema({
    email: {
      notEmpty: {
        errorMessage: t("EMAIL_ERROR_EMPTY","en"),
      },
      isEmail: {
        errorMessage: t("EMAIL_ERROR_INVALID","en"),
      },
    },
    password: {
      notEmpty: {
        errorMessage: t("PASSWORD_ERROR_EMPTY","en"),
      },
      isLength: {
        errorMessage: t("PASSWORD_LENGTH","en"),
        options: { min: 6, max: 15 },
      },
    },
  });
};

module.exports = { loginValidationRules };
