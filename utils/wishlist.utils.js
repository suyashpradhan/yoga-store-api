const getWishlistItems = async (wishlist) => {
  wishlist.products = wishlist.products.filter((product) => product.isActive);
  wishlist = await wishlist.populate("products._id").execPopulate();
  return wishlist.products.map((product) => product._id);
};

const itemInWishlistExists = async (wishlist) => {
  return wishlist.products.some((product) => product._id === _id);
};

module.exports = { getWishlistItems, itemInWishlistExists };
