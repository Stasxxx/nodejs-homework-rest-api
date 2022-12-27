const mongoose = require("mongoose");

require("dotenv").config();

mongoose.set("strictQuery", true)

const { DB_HOST } = process.env;

const connection = async () => {
    return mongoose.connect(DB_HOST,
        {
            useNewUrlParser: true,
            // useCreateIndex: true,
            useUnifiedTopology: true,
        });
};

module.exports = {
    connection
}