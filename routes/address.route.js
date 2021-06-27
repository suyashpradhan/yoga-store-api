const express = require("express");
const {
  getAllAdressess,
  addNewAddress,
} = require("../controllers/address.controller");
const router = express.Router();

router.route("/").get(getAllAdressess).post(addNewAddress);

module.exports = router;
