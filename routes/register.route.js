const express = require("express");
const router = express.Router();
const errorHandler = require("../utils/errorHandling.js");
const { User } = require("../models/users.model");
const { Wishlist } = require("../models/wishlist.model.js");

router.route("/").post(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    const savedUser = await user.save();
    res.status(201).json({
      success: true,
      message: "Succesfully signed up.",
      _id: savedUser._id,
    });
  } catch (error) {
    res.status(503).json({ success: false, message: error.message });
  }
});

module.exports = router;
