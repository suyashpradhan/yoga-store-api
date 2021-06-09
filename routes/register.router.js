const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/users.model");
const errorHandler = require("../utils/errorHandling.js");
const createToken = require("../utils/createToken.js");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      res.status(200).json({ success: true, message: "Register User Here" });
    } catch (error) {
      res.status(400).json({ success: true, message: "Invalid Route" });
    }
  })
  .post(async (req, res) => {
    const { fullName, userName, email, password } = req.body;

    /*  const emailExists = await User.findOne({ email })
     if (emailExists) return res.status(401).json({ success: false, message: "Email Already Exists, try signing in." });
 
     const checkUsername = await User.findOne({ userName });
     if (checkUsername) return res.status(401).json({ success: false, message: "Username already taken, try different one" }); */

    /*  const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); */

    try {
      const user = new User({
        fullName,
        userName,
        email,
        password,
      });
      const savedUser = await user.save();
      const token = createToken(savedUser._id);
      res.status(200).json({
        success: true,
        message: "Succesfully signed up.",
        _id: savedUser._id,
        token,
      });
    } catch (error) {
      const errors = errorHandler(error);
      res.status(401).json({ errors });
    }
  });

module.exports = router;
