const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT_ROUNDS;

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


module.exports = { passwordHash, comparePasswordHash }