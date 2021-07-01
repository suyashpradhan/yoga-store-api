const express = require("express");
const router = express.Router();
const errorHandler = require("../utils/errorHandling.js");
const createToken = require("../utils/createToken.js");
const { User } = require("../models/users.model");
const { Wishlist } = require("../models/wishlist.model.js");

router.route("/").post(async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const savedUser = await User.create({
      fullName,
      email,
      password,
    });
    let userWishlist = await Wishlist({ userId: savedUser._id, products: [] });
    userWishlist = await userWishlist.save();
    res.status(201).json({
      success: true,
      message: "Succesfully signed up.",
      _id: savedUser._id,
    });
  } catch (error) {
    const errors = errorHandler(error);
    res.status(503).json({ errors });
  }
});

module.exports = router;
