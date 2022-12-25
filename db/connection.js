const mongoose = require("mongoose");

require("dotenv").config();

const connection = async () => {
    return mongoose.connect(process.env.DB_HOST,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
};

module.exports = {
    connection
}