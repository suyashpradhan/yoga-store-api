const createToken = require("../utils/createToken.js");
const { User } = require("../models/users.model");
const bcrypt = require("bcrypt");

const userLogin = async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.status(401).json({
        success: false,
        message: "Username and password does not match",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Username or password is incorrect",
    });
  }
};

module.exports = { userLogin };
