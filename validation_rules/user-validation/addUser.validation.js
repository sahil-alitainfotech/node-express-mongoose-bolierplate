const { checkSchema } = require("express-validator");
const { USER_MESSAGES } = require("../../controller-messages/user.messages");
const User = require("../../schema/user.schema");

const addUserValidationRules = () => {
  return checkSchema({
    first_name: {
      notEmpty: {
        errorMessage: USER_MESSAGES.FIRST_NAME_REQUIRED,
      },
      matches: {
        options: [/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/gm],
        errorMessage: USER_MESSAGES.FIRST_NAME_MIN_LENGTH,
      },
      custom: {
        options: (value) =>
          User.find({ first_name: value }).then((user) => {
            if (user.length > 0) {
              throw new Error(USER_MESSAGES.FIRST_NAME_ALREADY_EXISTS)
            }
          }),
      },
    },
    last_name: {
      notEmpty: {
        errorMessage: USER_MESSAGES.LAST_NAME_REQUIRED,
      },
      matches: {
        options: [/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/gm],
        errorMessage: USER_MESSAGES.LAST_NAME_MIN_LENGTH,
      },
      custom: {
        options: (value) =>
          User.find({ last_name: value }).then((user) => {
            if (user.length > 0) {
              throw new Error(USER_MESSAGES.LAST_NAME_ALREADY_EXISTS)
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
              throw new Error(USER_MESSAGES.EMAIL_ALREADY_EXISTS)
            }
          }),
      },
    },
    password: {
      notEmpty: {
        errorMessage: USER_MESSAGES.PASSWORD_REQUIRED,
      },
      matches: {
        options: [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/],
        errorMessage: USER_MESSAGES.PASSWORD_TYPE_IN_VALID,
      },
    },
  });
};

module.exports = { addUserValidationRules };
