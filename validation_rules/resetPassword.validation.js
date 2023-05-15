const { checkSchema } = require("express-validator");

const resetPasswordValidationRules = () => {
  return checkSchema({
    reset_password_token: {
      notEmpty: {
        errorMessage: (value, { req }) => {
          const language = req.headers['testlanguage'] || "en";
          return getErrorMessage(language, "TOKEN_REQUIRED");
        },
      },
    },
    new_password: {
      notEmpty: {
        errorMessage: (value, { req }) => {
          const language = req.headers['testlanguage'] || "en";
          return getErrorMessage(language, "PASSWORD_REQUIRED");
        },
      },
      matches: {
        options: [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/],
        errorMessage: (value, { req }) => {
          const language = req.headers['testlanguage'] || "en";
          return getErrorMessage(language, "PASSWORD_TYPE_IN_VALID");
        }
      },
    },
  });
};

module.exports = { resetPasswordValidationRules };
