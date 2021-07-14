const Wishlist = require("../models/wishlist.model");
const { populateProducts } = require('../utils/populateProducts.util')

const createUserWishlistDocument = async (req, res, next) => {
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

const fetchUserWishlist = async (req, res) => {
  try {
    let { wishlist } = req;
    let wishlistItems = await populateProducts(wishlist);
    res.json({ success: true, wishlistItems });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to retrive the wishlist",
      errMessage: err.message,
    });
  }
};

const actionOnWishlist = async (req, res) => {
  const { _id } = req.body;
  const { wishlist } = req;
  const productExists = wishlist.products.some((product) => product._id == _id);
  if (productExists) {
    for (let product of wishlist.products) {
      if (product._id == _id) {
        product.isActive = !product.isActive;
        break;
      }
    }
  } else {
    wishlist.products.push({ _id, isActive: true });
  }

  let updatedWishlist = await wishlist.save();
  let wishlistItems = await populateProducts(updatedWishlist);
  res.status(201).json({ success: true, wishlist: wishlistItems });
};


module.exports = {
  createUserWishlistDocument,
  fetchUserWishlist,
  actionOnWishlist,
};
