const mongoose = require('mongoose')

const groupSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        created_by: {
            type: String,
            default: null,
            required: false,
        },
        updated_by: {
            type: String,
            default: null,
            required: false,
        },
        is_deleted: {
            type: Boolean,
            default: false,
            required: false,
        },
        deleted_by: {
            type: String,
            default: null,
            required: false,
        }
    },
    { timestamps: true }
)

const Group = mongoose.model("Group", groupSchema)

module.exports = Group