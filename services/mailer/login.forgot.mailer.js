const handlebars = require("handlebars");
const fs = require("fs");
const {
    RESPONSE_PAYLOAD_STATUS_ERROR,
    RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR,
    RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
} = require("../../constants/global.constants");
const { transporter } = require("../../helpers/fn");



// login massage success mail send 

const loginMassageMailer = async (email) => {

    try {
        let url = `${process.env.REACT_APP_BASE_URL}/login`
        const emailTemplateSource = fs.readFileSync("./views/mails/login.hbs", "utf8");
        const template = handlebars.compile(emailTemplateSource);
        const htmlToSend = template({ url: `${url}` });
        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: `${email}`,
            subject: `login success.`,
            text: "Opus login success",
            html: htmlToSend,
        })
    }
    catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        };
        return res
            .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
            .json(responsePayload);
    }
}

// forgot Password Mail send

const forgotPasswordMailer = async (code, email) => {

    try {

        let url = `${process.env.REACT_APP_BASE_URL}/reset-password`
        const emailTemplateSource = fs.readFileSync("./views/mails/resetPassword.hbs", "utf8");
        const template = handlebars.compile(emailTemplateSource);
        const htmlToSend = template({ urlorcode: `${url}/${code}` });

        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: `${email}`,
            subject: `Reset Password.`,
            text: "Password Reset",
            html: htmlToSend,
        })
    }
    catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        };
        return res
            .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
            .json(responsePayload);
    }
}


module.exports = {
    loginMassageMailer,
    forgotPasswordMailer
}