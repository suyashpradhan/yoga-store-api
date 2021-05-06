const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
});

const Wishlist = mongoose.model("wishlist", wishlistSchema);

module.exports = { Wishlist };
