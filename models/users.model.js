const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail, isStrongPassword } = require("validator");
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
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
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Wishlist",
    },
  ],
  bag: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bag",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

//Middleware after user is created!
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Static method for login
userSchema.statics.login = async function (email, password) {
  const matchedUser = await this.findOne({ email });

  if (matchedUser) {
    const auth = await bcrypt.compare(password, matchedUser.password);
    if (auth) {
      return matchedUser;
    }
  }
  throw Error("invalid");
};

//Created User Model
const User = mongoose.model("User", userSchema);

module.exports = { User, userSchema };
