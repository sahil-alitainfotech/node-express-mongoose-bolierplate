const { checkSchema } = require("express-validator");
const { USER_MESSAGES } = require("../../controller-messages/user.messages");

const updateUserValidationRules = () => {
    return checkSchema({
        first_name: {
            notEmpty: {
                errorMessage: USER_MESSAGES.FIRST_NAME_REQUIRED,
            },
            matches: {
                options: [/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/gm],
                errorMessage: USER_MESSAGES.FIRST_NAME_MIN_LENGTH,
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
        },
    });
};

module.exports = { updateUserValidationRules };
