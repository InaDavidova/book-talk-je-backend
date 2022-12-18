const mongoose = require("mongoose");

require('../models/User');
require('../models/Book');

const dbName = "book-talk";
const connectionString = `mongodb://localhost:27017/${dbName}`;

async function init() {
  try {
    mongoose.set("strictQuery", false);

    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected!");

    mongoose.connection.on("error", (err) => {
      console.log("Database error");
      console.log(err);
    });
  } catch (err) {
    console.log("Can't connect to database");
    process.exit(1);
  }
}

module.exports = init;
