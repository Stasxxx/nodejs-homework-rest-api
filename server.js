// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

require("dotenv").config();

const {connection} = require("./db/connection")

const PORT = process.env.PORT || 3000;
// const uriDb = process.env.DB_HOST;

// const { connection } = require('mongoose')
const app = require('./app')

const start = async() => {
  try {
    await connection();

    app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
})
  }
  catch (error) {
    console.log(`Server not running. Error message: ${error.message}`)
  }
}

start()



//J9VtMyVTS252QPf