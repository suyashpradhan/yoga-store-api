const mongoose = require("mongoose");
require("dotenv").config();

const dbconnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("server connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbconnection;
