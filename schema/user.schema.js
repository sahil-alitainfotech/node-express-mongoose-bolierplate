const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
            default: null,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
