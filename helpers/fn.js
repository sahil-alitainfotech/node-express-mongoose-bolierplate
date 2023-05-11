const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer')
const saltRounds = process.env.SALT_ROUNDS;


// hash password

const passwordHash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, parseInt(saltRounds), (err, hash) => {
            if (err) {
                return reject(err);
            }
            return resolve(hash);
        });
    });
};

// compare password 

const comparePasswordHash = (password, hash) => {
    return new Promise((resolve) => {
        bcrypt.compare(password, hash).then((isValid) => {
            if (isValid) {
                return resolve(isValid);
            }
            return resolve(isValid);
        });
    });
};

// mail transporter

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: process.env.SERVICE,
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
});




module.exports = { passwordHash, comparePasswordHash, transporter }