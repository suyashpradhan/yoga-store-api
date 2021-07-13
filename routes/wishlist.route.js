const express = require("express");
const router = express.Router();
const {
  createUserWishlistDocument,
  fetchUserWishlist,
  actionOnWishlist,
} = require("../controllers/wishlist.controller");

router.use(createUserWishlistDocument);

router.route("/").get(fetchUserWishlist).post(actionOnWishlist)
module.exports = router;
