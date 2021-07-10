const express = require("express");
const router = express.Router();
const { createUserAddressDocument,
  fetchUserAddress,
  addNewAddress,
  removeUserAddress } = require("../controllers/address.controller");

router.use(createUserAddressDocument);

router.route("/")
  .get(fetchUserAddress)
  .post(addNewAddress)
  .put(removeUserAddress);

module.exports = router;