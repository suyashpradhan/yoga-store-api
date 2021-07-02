const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Full name is required"],
  },
  lastName: {
    type: String,
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

//Middleware after user is created!
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Static method for login
UserSchema.statics.login = async function (email, password) {
  console.log(email, password);
  const matchedUser = await this.findOne({ email });
  console.log(matchedUser);

  if (matchedUser) {
    const auth = await bcrypt.compare(password, matchedUser.password);
    if (auth) {
      return matchedUser;
    }
  }
  throw Error("invalid");
};

//Created User Model
const User = mongoose.model("User", UserSchema);

module.exports = { User, UserSchema };
