
const express = require('express');
const bcrypt = require('bcrypt')
const User = require('../../schema/user.schema');
const {
    RESPONSE_PAYLOAD_STATUS_SUCCESS,
    RESPONSE_STATUS_CODE_OK,
    RESPONSE_PAYLOAD_STATUS_ERROR,
    RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR,
    RESPONSE_STATUS_CODE_NOT_FOUND
} = require("../../constants/global.constants");
const { USER_MESSAGES } = require('../../controller-messages/user.messages');


// const addUsers = async (req, res) => {
//     try {
//         const { first_name, last_name, email, password } = req.body;
//         let existUser = await User.find({ email: email });
//         if (existUser.length === 1) {
//             const responsePayload = {
//                 status: RESPONSE_PAYLOAD_STATUS_ERROR,
//                 message: USER_MESSAGES.EMAIL_EXISTS,
//                 data: null,
//                 error: USER_MESSAGES.EMAIL_EXISTS,
//             };
//             return res
//                 .status(RESPONSE_STATUS_CODE_VALIDATION_ERROR)
//                 .json(responsePayload);
//         }
//         else {
//             let new_password = bcrypt.hashSync(password, 12);
//             const user = User.create({
//                 first_name: first_name,
//                 last_name: last_name,
//                 email: email,
//                 password: new_password,
//             });
//             if (user) {
//                 const responsePayload = {
//                     status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
//                     message: USER_MESSAGES.USERS_ADDED,
//                     data: user,
//                     error: null,
//                 };
//                 return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//             }
//             else {
//                 const responsePayload = {
//                     status: RESPONSE_PAYLOAD_STATUS_ERROR,
//                     message: USER_MESSAGES.USERS_NOT_ADDED,
//                     data: null,
//                     error: USER_MESSAGES.USERS_NOT_ADDED,
//                 };
//                 return res.status(RESPONSE_STATUS_CODE_NOT_FOUND).json(responsePayload);
//             }
//         }
//     }
//     catch (err) {
//         const responsePayload = {
//             status: RESPONSE_PAYLOAD_STATUS_ERROR,
//             message: null,
//             data: null,
//             error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
//         };
//         return res
//             .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
//             .json(responsePayload);
//     }
// };


const addUsers = async (req, res) => {
    try {
        let { first_name, last_name, email, password } = req.body;
        let newPassword = await bcrypt.hash(password, 12);
        let addUser = await User.create({
            first_name,
            last_name,
            email,
            password: newPassword
        });

        if (addUser) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: USER_MESSAGES.USERS_ADDED,
                data: null,
                error: null,
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: null,
                data: null,
                error: USER_MESSAGES.USERS_NOT_ADDED,
            };
            return res.status(RESPONSE_STATUS_CODE_NOT_FOUND).json(responsePayload);
        }
    } catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: err.message,
        };
        return res
            .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
            .json(responsePayload);
    }
};

module.exports = { addUsers }