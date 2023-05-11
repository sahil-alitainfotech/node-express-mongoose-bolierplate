const { checkSchema } = require("express-validator");
const { USER_MESSAGES } = require("../controller-messages/user.messages");
const User = require("../schema/user.schema");

const registerValidationRules = () => {
  return checkSchema({
    first_name: {
      matches: {
        options: [/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/gm],
        errorMessage: USER_MESSAGES.FIRST_NAME_MIN_LENGTH,
      },
      notEmpty: {
        errorMessage: USER_MESSAGES.FIRST_NAME_REQUIRED,
      },
      custom: {
        options: (value) =>
          User.find({ first_name: value }).then((user) => {
            if (user.length > 0) {
              return Promise.reject(
                "The account has been created with given first name"
              );
            }
          }),
      },
    },
    last_name: {
      matches: {
        options: [/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/gm],
        errorMessage: USER_MESSAGES.LAST_NAME_MIN_LENGTH,
      },
      notEmpty: {
        errorMessage: USER_MESSAGES.LAST_NAME_REQUIRED,
      },
      custom: {
        options: (value) =>
          User.find({ last_name: value }).then((user) => {
            if (user.length > 0) {
              return Promise.reject(
                "The account has been created with given last name"
              );
            }
          }),
      },
    },
    email: {
      notEmpty: {
        errorMessage: USER_MESSAGES.EMAIL_REQUIRED,
      },
      isEmail: {
        errorMessage: USER_MESSAGES.EMAIL_INVALID,
      },
      custom: {
        options: (value) =>
          User.find({ email: value }).then((user) => {
            if (user.length > 0) {
              return Promise.reject(
                "The account has been created with given email"
              );
            }
          }),
      },
    },
    password: {
      matches: {
        options: [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/],
        errorMessage: USER_MESSAGES.PASSWORD_TYPE_IN_VALID,
      },
      notEmpty: {
        errorMessage: USER_MESSAGES.PASSWORD_REQUIRED,
      },
    },
  });
};

module.exports = { registerValidationRules };
