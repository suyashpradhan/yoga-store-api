const express = require("express");
const router = express.Router();

const { createUserBag, getUserBag, addProductInBag, emptyBag } = require("../controllers/bag.controller")

router.use(createUserBag);

router.route("/")
.get(getUserBag)
.post(addProductInBag)
.delete(emptyBag);


module.exports = router;
