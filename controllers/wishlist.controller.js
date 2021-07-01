const mongoose = require("mongoose");
const { Wishlist } = require("../models/wishlist.model");
const {
  getWishlistItems,
  itemInWishlistExists,
} = require("../utils/wishlist.utils");

const createUserWishlist = async (req, res, next) => {
  const { user } = req;

  try {
    let newWishlist = await Wishlist.findOne({ userId: user._id });

    if (!newWishlist) {
      newWishlist = new Wishlist({ user_Id: user._id, products: [] });
      newWishlist = await newWishlist.save();
    }
    req.newWishlist = newWishlist;
    next();
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const fetchUserWishlist = async (req, res) => {
  try {
    let { wishlist } = req;
    let wishlistItem = await getWishlistItems(wishlist);
    res.status(200).json({
      success: true,
      message: "User Wishlist",
      wishlistItem,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch the wishlist",
    });
  }
};

const addItemInWishlist = async (req, res) => {
  const { _id } = req.body;
  const { wishlist } = req;

  if (itemInWishlistExists(wishlist)) {
    for (item of wishlist.products) {
      if (item._id === _id) {
        item.isActive = !item.isActive;
        break;
      }
    }
  } else {
    wishlist.products.push({ _id, isActive: true });
    res.status(200).json({ success: true });
  }

  const updatedWishlist = await wishlist.save();
  const savedWishlist = await getWishlistItems(updatedWishlist);
  res.status(200).json({ success: true, wishlist: savedWishlist });
};

module.exports = { createUserWishlist, fetchUserWishlist, addItemInWishlist };
