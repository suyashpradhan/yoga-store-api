const express = require("express");
const router = express.Router();

const { createUserBag, getUserBag, bagAction, emptyBag } = require("../controllers/bag.controller")

router.use(createUserBag);

router.route("/")
.get(getUserBag)
.post(bagAction)
.delete(emptyBag);


module.exports = router;
