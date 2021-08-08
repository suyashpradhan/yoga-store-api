const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: [true, "user name is required"],
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});


//Created User Model
const User = mongoose.model("User", UserSchema);

module.exports = { User, UserSchema };
