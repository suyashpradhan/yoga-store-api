const express = require("express");
const { User } = require("../models/users.model");
const bcrypt = require("bcrypt");

const createNewUser = async (req, res) => {
try {
    let userData = req.body;
    const userNameExists = await User.findOne({ userName: userData.userName });
    const emailExists = await User.findOne({ email: userData.email });
    if (userNameExists) {
      res.status(409).json({ success: false, message: "Username is taken." });
      return userNameExists;
    }
    if (emailExists) {
      res
        .status(409)
        .json({ success: false, message: "Email is already registered." });
      return emailExists;
    }
    userData.password = bcrypt.hashSync(userData.password, 10);
    let newUser = new User(userData);
    newUser = await newUser.save();

    res.json({ success: true, message:"Successfully added new user" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to add new user",
      errMessage: err.message,
    });
  }
};

module.exports = { createNewUser };
