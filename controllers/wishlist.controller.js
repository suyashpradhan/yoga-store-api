const { Wishlist } = require("../models/wishlist.model");
const {lodash} = require("lodash")

const findUserWishlist = async (req, res, next) => {
  try {
    const { user } = req;
    let wishlist = await Wishlist.findOne({ userId: user._id });

    if (!wishlist) {
      wishlist = new Wishlist({ userId: user._id, products: [] });
      wishlist = await wishlist.save();
    }

    req.wishlist = wishlist;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrive wishlist details",
      errorMessage: error.message,
    });
  }
};

const getWishlistItems = async (wishlist) => {
  wishlist.products = wishlist.products.filter((product) => product.isInWishlist);
  wishlist = await wishlist.populate("products._id").execPopulate();
  return wishlist.products.map((product) => product._id);
};

const getUserWishlist = async (req, res) => {
  try {
    let { wishlist } = req;
    let wishlistItems = await getWishlistItems(wishlist);
    res.json({ success: true, wishlistItems });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to retrive the wishlist",
      errMessage: err.message,
    });
  }
};

const addItemInWishlist = async (req, res) => {
  const { _id } = req.body;
  const { wishlist } = req;

  try {
    wishlist.products.push({ _id, isInWishlist: true });
    let updatedWishlist = await wishlist.save();
    let wishlistItems = await getWishlistItems(updatedWishlist);
    res.status(201).json({ success: true, wishlist: wishlistItems });
  } catch (e) {
    res.status(503).json({ success: false, message: "Something Went Wrong" });
  }
};


module.exports = {
  findUserWishlist,
  getUserWishlist,
  addItemInWishlist,
};
