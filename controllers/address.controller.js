const Address = require("../models/address.model");
const { extend, concat } = require("lodash");
const populateUserAddress = require("../utils/address.util")

const createUserAddressDocument = async (req, res, next) => {
  try {
    const { user } = req;
    let address = await Address.findOne({ userId: user._id });

    if (!address) {
      address = new Address({ userId: user._id, addresses: [] });
      address = await address.save();
    }
    req.address = address;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create address ",
      errorMessage: error.message,
    });
  }
};


const fetchUserAddress = async (req, res) => {
  try {
    let { address } = req;
    let addressList = await populateUserAddress(address);
    res.status(200).json({ success: true, address: addressList });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to retrive the address details",
      errMessage: err.message,
    });
  }
};

const addNewAddress = async (req, res) => {
  const addressBody = req.body;
  let { address } = req;

  try {
    address.addresses.push({ addressBody, isActive: true });
    let updatedAddress = await address.save();
    let userAddress = await createUserAddressDocument(updatedAddress);
    res.status(201).json({ success: true, address: userAddress });
  } catch (e) {
    res.status(503).json({ success: false, message: "Something Went Wrong" });
  }
};


const removeUserAddress = async (req, res) => {
  const { _id } = req.body;
  let { address } = req;
  for (let singleAddress of address.addresses) {
    if (singleAddress._id == _id) {
      addr.isActive = false;
      break;
    }
  }
  let addressList = await address.save();
  addressList = await populateUserAddress(address);
  res.status(200).json({ success: true, address: addressList });
};

module.exports = {
  createUserAddressDocument,
  addNewAddress,
  fetchUserAddress,
  removeUserAddress,
};
