const mongoose = require("mongoose");
const { Wishlist } = require("../models/wishlist.model");
const { Product } = require("../models/products.model");

const productsPopulateOptions = {
  path: "products.product",
  select: "_id name image price discountedPrice ratings",
};

const getProductById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(400).json({ success: false, message: "Product Not Found" });
    }
    req.product = product;
    next();
  } catch (e) {
    res.status(503).json({ success: false, error: "Something went wrong" });
  }
};

const getUserWishlist = async (req, res, next) => {
  try {
    const { user } = req;
    const wishlist = await Wishlist.findOne({ userId: user._id }).populate({
      productsPopulateOptions,
    });
    req.wishlist = wishlist;
    next();
  } catch (err) {
    res.status(503).json({ success: false, error: "something went wrong" });
  }
};

module.exports = { getProductById, getUserWishlist };
