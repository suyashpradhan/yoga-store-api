const mongoose = require("mongoose");
const { isEmail, isStrongPassword } = require("validator");
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
  },
  userName: {
    type: String,
    required: [true, "User name is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: [
      isStrongPassword,
      "Password requirements: Minimum 8 characters long, One Uppercase Character, One Lowercase Character & One Special Character",
    ],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

//Joi Validation
/* const schema = Joi.object({
  fullName: Joi.string().required(),
  userName: Joi.string().min(8).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
}); */

const User = mongoose.model("User", userSchema);

module.exports = { User };
