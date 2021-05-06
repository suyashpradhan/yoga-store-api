const mongoose = require("mongoose");
const DB_CONNECTION = process.env['DB_CONNECTION']

const dbconnection = async () => {
  try {
    await mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("server connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbconnection;
