// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

require("dotenv").config();

const {connection} = require("./db/connection")

const PORT = process.env.PORT || 3000;
// const uriDb = process.env.DB_HOST;

const app = require('./app')

const start = async() => {
  try {
    await connection();

    app.listen(PORT, () => {
      console.log(`Database connection successful`);
})
  }
  catch (error) {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  }
}

start();