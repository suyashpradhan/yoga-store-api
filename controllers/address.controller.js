const express = require("express");
const Address = require("../models/address.model");

const getAllAdressess = async (req, res) => {
  try {
    const address = await Address.find().lean();
    res
      .status(200)
      .json({ success: true, message: "User's Address List", address });
  } catch (e) {
    res.status(401).json({
      success: false,
      errorMessage: "Error while fetching user's address",
      error: e.message,
    });
  }
};

const addNewAddress = async (req, res) => {
  const { name, phoneNumber, pincode, locality, landmark, address, city } =
    req.body;

  try {
    const newAddress = await new Address({
      name,
      phoneNumber,
      pincode,
      locality,
      landmark,
      address,
      city,
    });
    const savedAddress = await newAddress.save();
    res
      .status(200)
      .json({ success: true, message: "New Address Added", savedAddress });
  } catch (e) {
    res.status(401).json({
      success: false,
      errorMessage: "Error while adding new user address",
      error: e.message,
    });
  }
};

module.exports = { getAllAdressess, addNewAddress };
