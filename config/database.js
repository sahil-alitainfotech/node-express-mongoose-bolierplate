// require("dotenv").config();
// const { default: mongoose } = require("mongoose");

// mongoose.set("strictQuery", false);

// const db = async () => {
//     try {
//         // await new mongoose.connect(process.env.URL);
//         await new mongoose.connect(process.env.URL)
//     }
//     catch (err) {
//         console.error("Error", err);
//     }
// };

// module.exports = db;




const mongoose = require("mongoose");

require("dotenv").config();
const database = process.env.DB_NAME;
const host = process.env.HOST;
const port = process.env.DB_PORT;
const mongo = process.env.DB_TYPE;

mongoose.set("strictQuery", false);
mongoose.set("debug", true);

mongoose
    .connect(`${mongo}://${host}:${port}/${database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((connect) => {
        console.log("Connected with the database.");
    })
    .catch((err) => {
        console.log("error ===>", err);
    });