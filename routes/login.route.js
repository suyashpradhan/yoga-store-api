const express = require("express");
const bcrypt = require("bcrypt");

const { User } = require("../models/users.model");
const createToken = require("../utils/createToken.js");
const router = express.Router();

router.route("/").post(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({});
    if (user.email) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
    }
    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      message: "LoggedIn Successfully",
      _id: user._id,
      token: token,
    });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
});

module.exports = router;
