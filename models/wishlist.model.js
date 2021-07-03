const mongoose = require("mongoose");
const { Schema } = mongoose;

const WishlistItemSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  isInWishlist: {
    type: Boolean,
  },
});

const WishlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [WishlistItemSchema],
});

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = { Wishlist };
