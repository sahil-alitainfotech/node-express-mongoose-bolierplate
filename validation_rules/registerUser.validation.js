const { checkSchema } = require("express-validator");
const User = require("../schema/user.schema");
const { languages } = require("../translate/languages.validation");

const registerValidationRules = () => {

  const getErrorMessage = (language, key) => {
    return languages[language]?.[key] || languages.en[key];
  };

  return checkSchema({
    first_name: {
      notEmpty: {
        errorMessage: (value, { req }) => {
          const language = req.headers['testlanguage'] || "en";
          return getErrorMessage(language, "FIRST_NAME_REQUIRED");
        },
      },
      matches: {
        options: [/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/gm],
        errorMessage: (value, { req }) => {
          const language = req.headers['testlanguage'] || "en";
          return getErrorMessage(language, "FIRST_NAME_MIN_LENGTH");
        },
      },
      custom: {
        options: (value, { req }) => {
          return User.find({ first_name: value }).then((user) => {
            if (user.length > 0) {
              const language = req.headers['testlanguage'];
              const errorMessage = getErrorMessage(language, "FIRST_NAME_ALREADY_EXISTS");

              return Promise.reject({
                errorMessage,
              });
            }
          });
        },
      },
    },
    last_name: {
      notEmpty: {
        errorMessage: (value, { req }) => {
          const language = req.headers['testlanguage'] || "en";
          return getErrorMessage(language, "LAST_NAME_REQUIRED");
        },
      },
      matches: {
        options: [/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/gm],
        errorMessage: (value, { req }) => {
          const language = req.headers['testlanguage'] || "en";
          return getErrorMessage(language, "LAST_NAME_MIN_LENGTH");
        },
      },
      custom: {
        options: (value, { req }) => {
          return User.find({ last_name: value }).then((user) => {
            if (user.length > 0) {
              const language = req.headers['testlanguage'];
              const errorMessage = getErrorMessage(language, "LAST_NAME_ALREADY_EXISTS");

              return Promise.reject({
                errorMessage,
              });
            }
          });
        },
      },
    },
    email: {
      notEmpty: {
        errorMessage: (value, { req }) => {
          const language = req.headers['testlanguage'] || "en";
          return getErrorMessage(language, "EMAIL_REQUIRED");
        },
      },
      isEmail: {
        errorMessage: (value, { req }) => {
          const language = req.headers['testlanguage'] || "en";
          return getErrorMessage(language, "EMAIL_INVALID");
        },
      },
      custom: {
        options: (value, { req }) => {
          return User.find({ email: value }).then((user) => {
            if (user.length > 0) {
              const language = req.headers['testlanguage'];
              const errorMessage = getErrorMessage(language, "EMAIL_ALREADY_EXISTS");

              return Promise.reject({
                errorMessage,
              });
            }
          });
        },
      },
    },
    password: {
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


module.exports = { registerValidationRules };
