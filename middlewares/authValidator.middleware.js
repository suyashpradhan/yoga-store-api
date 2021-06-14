const { User } = require("../models/users.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const authValidator = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "User is not logged in" });
    }

    const { id } = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById({ id })
      .select("")
      .populate({
        path: "bag",
        populate: { path: "id" },
      })
      .populate({
        path: "wishlist",
        populate: { path: "id" },
      });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Not valid user",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = authValidator;
