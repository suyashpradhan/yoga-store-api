const express = require("express");
const router = express.Router();
const {
  findUserWishlist,
  getUserWishlist,
  updateWishlist,
} = require("../controllers/wishlist.controller");

router.use(findUserWishlist);

router.route("/").get(getUserWishlist).post(addItemInWishlist);
module.exports = router;
