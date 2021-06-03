const express = require("express");
const router = express.Router();
const { Wishlist } = require("../models/wishlist.model");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const wishlistItem = await Wishlist.find().populate("_id");
      const getWishlistItem = wishlistItem.map((item) => {
        const { _id, ...doc } = item._id._doc;
        return {
          _id: _id,
          ...doc,
          isInWishlist: item.isInWishlist,
        };
      });
      res.status(200).json(getWishlistItem);
    } catch (error) {
      res
        .status(502)
        .send({ success: false, message: "unable to show wishlist items" });
    }
  })
  .post(async (req, res) => {
    try {
      const product = req.body;
      const wishlistItem = new Wishlist({ _id:req.body._id});
      await wishlistItem.save();
      res.status(201).json(product);
    } catch (error) {
      res
        .status(201)
        .send({ success: false, message: "unable to add to wishlist" });
    }
  });

router.route("/:_id").delete(async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params._id);
    res.status(204).json({});
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "unable to delete wishlist item" });
  }
});

module.exports = router;
