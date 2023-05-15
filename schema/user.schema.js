const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            max: 50,
            required: true
        },
        last_name: {
            type: String,
            max: 50,
            required: true
        },
        email: {
            type: String,
            max: 120,
            required: true
        },
        password: {
            type: String,
            max: 255,
            required: true
        },
        token: {
            type: String,
            max: 500,
            default: null,
            required: false
        },
        reset_password_token: {
            type: String,
            max: 500,
            default: null,
            required: false,
        },
        reset_password_expiry_time: {
            type: Date,
            required: false,
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
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
