const { MongoClient } = require('mongodb');
const js = require('jspdf-autotable');
const { jsPDF } = require('jspdf');
const { RESPONSE_PAYLOAD_STATUS_ERROR } = require('../constants/global.constants');
require("dotenv").config();

const database = process.env.DB_NAME;
const host = process.env.HOST;
const port = process.env.DB_PORT;
const mongo = process.env.DB_TYPE;


const generatePDF = async () => {
    const uri = `${mongo}://${host}:${port}/${database}`;
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db(process.env.DB_NAME);
        const collection = database.collection('users');

        const users = await collection.find().toArray();

        let doc = new jsPDF();

        let info = [];

        users.forEach((element, index, array) => {
            info.push([
                element.first_name,
                element.last_name,
                element.email,
                element.password
            ]);
        });

        doc.autoTable({
            head: [
                [
                    'First Name',
                    'Last Name',
                    'Email',
                    'Password'
                ],
            ],
            body: info,
        });

        doc.save('output.pdf');
    } catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: err.message,
        }
        return res
            .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
            .json(responsePayload)
    }
    finally {
        await client.close();
    }
}

module.exports = { generatePDF }
