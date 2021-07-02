const express = require("express");
const router = express.Router();
const { User } = require("../models/users.model");
const { createToken } = require("../utils/createToken");

router
  .route("/")
  .get(async (req, res) => {
    res.status(200).json({ success: true, message: "Register here" });
  })
  .post(async (req, res) => {
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
      res.status(401).json({ success: false, message: error });
    }
  });

module.exports = router;
