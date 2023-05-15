const { checkSchema } = require("express-validator")
const { GROUP_MRSSAGES } = require("../../controller-messages/group.messages")

const updateGroupValidationRules = () => {
    return checkSchema({
        title: {
            notEmpty: {
                errorMessage: GROUP_MRSSAGES.TITLE_REQUIRED,
            },
        },
    })
}

module.exports = { updateGroupValidationRules }