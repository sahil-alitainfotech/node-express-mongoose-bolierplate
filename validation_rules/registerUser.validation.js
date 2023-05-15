const { checkSchema } = require("express-validator");
const { USER_MESSAGES } = require("../controller-messages/user.messages");
const User = require("../schema/user.schema");
const { t } = require("../helpers/i18n");

const registerValidationRules = () => {
  return checkSchema({
    first_name: {
      notEmpty: {
        errorMessage: t("FIRST_NAME_REQUIRED", "en"),
      },
      matches: {
        options: [/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/gm],
        errorMessage: t("FIRST_NAME_MIN_LENGTH", "en"),
      },
      custom: {
        options: (value) =>
          User.find({ first_name: value }).then((user) => {
            if (user.length > 0) {
              return Promise.reject(
                t('FIRST_NAME_ALREADY_EXISTS', "en")
              );
            }
          }),
      },
    },
    last_name: {
      notEmpty: {
        errorMessage: t("LAST_NAME_REQUIRED", "en"),
      },
      matches: {
        options: [/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/gm],
        errorMessage: t("LAST_NAME_MIN_LENGTH", "en"),
      },
      custom: {
        options: (value) =>
          User.find({ last_name: value }).then((user) => {
            if (user.length > 0) {
              return Promise.reject(
                t('LAST_NAME_ALREADY_EXISTS', "en")
              );
            }
          }),
      },
    },
    email: {
      notEmpty: {
        errorMessage: t("EMAIL_REQUIRED", "en"),
      },
      isEmail: {
        errorMessage: t("EMAIL_INVALID", "en"),
      },
      custom: {
        options: (value) =>
          User.find({ email: value }).then((user) => {
            if (user.length > 0) {
              return Promise.reject(
                t('EMAIL_ALREADY_EXISTS', "en")
              );
            }
          }),
      },
    },
    password: {
      notEmpty: {
        errorMessage: t("PASSWORD_REQUIRED", "en"),
      },
      matches: {
        options: [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/],
        errorMessage: t("PASSWORD_TYPE_IN_VALID", "en"),
      },
    },
  });
};

module.exports = { registerValidationRules };
