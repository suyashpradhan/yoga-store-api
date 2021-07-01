const express = require("express");
const router = express.Router();
const {
  createUserWishlist,
  fetchUserWishlist,
  addItemInWishlist,
} = require("../controllers/wishlist.controller");

/* router
  .route("/")
  .get(async (req, res) => {
    try {
      const wishlistItem = await Wishlist.find().populate("_id");
      const getWishlistItem = wishlistItem.map((item) => {
        const { _id, ...doc } = item._id._doc;
        return {
          _id: _id,
          ...doc,
        };
      });
      res.status(200).json(getWishlistItem);
    } catch (error) {
      res
        .status(400)
        .send({ success: false, message: "unable to show wishlist items" });
    }
  })
  .post(async (req, res) => {
    try {
      const wishlistItem = new Wishlist({ _id: req.body._id });
      const savedWishlist = await wishlistItem.save();
      res.status(201).json({ savedWishlist });
    } catch (error) {
      res
        .status(400)
        .send({ success: false, message: "unable to add to wishlist" });
    }
  });

router.route("/:_id").delete(async (req, res) => {
  try {
    const { _id } = req.params;
    const productId = await Wishlist.findByIdAndDelete(_id);
    res.status(201).json({ success: true, message: "Item deleted", productId });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "unable to delete wishlist item" });
  }
}); */

router.use(createUserWishlist);

router.route("/").get(fetchUserWishlist).post(addItemInWishlist);
module.exports = router;
