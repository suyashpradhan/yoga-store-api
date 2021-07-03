const express = require("express");
const router = express.Router();
const {
  findUserWishlist,
  getUserWishlist,
  addItemInWishlist,
} = require("../controllers/wishlist.controller");

router.use(findUserWishlist);

router.route("/").get(getUserWishlist).post(addItemInWishlist)
module.exports = router;
