const { checkSchema } = require("express-validator")
const { GROUP_MRSSAGES } = require("../../controller-messages/group.messages")
const Group = require("../../schema/group.schema")

const createGroupValidationRules = () => {

    return checkSchema({
        title: {
            notEmpty: {
                errorMessage: GROUP_MRSSAGES.TITLE_REQUIRED,
            },
            custom: {
                options: (value) =>
                    Group.find({ title: value }).then((group) => {
                        if (group.length > 0) {
                            throw new Error(GROUP_MRSSAGES.TITLE_EXISTS)
                        }
                    })
            }
        },
        slug: {
            custom: {
                options: (value) =>
                    Group.find({ slug: value }).then((group) => {
                        if (group.length > 0) {
                            throw new Error(GROUP_MRSSAGES.SLUG_EXISTS)
                        }
                    })
            }
        },
    })
}

module.exports = { createGroupValidationRules }