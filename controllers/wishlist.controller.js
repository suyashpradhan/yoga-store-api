const { Wishlist } = require("../models/wishlist.model");

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
  wishlist.products = wishlist.products.filter((product) => product.isActive);
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
  /* const { _id } = req.body;
  const { wishlist } = req;

  let resStatus;
  const productExists = wishlist.products.some((product) => product._id == _id);
  if (productExists) {
    resStatus = 200;
    for (let product of wishlist.products) {
      if (product._id == _id) {
        product.isActive = !product.isActive;
        break;
      }
    }
  } else {
    resStatus = 201;
    wishlist.products.push({ _id, isActive: true });
  }

  let updatedWishlist = await wishlist.save();
  let wishlistItems = await getWishlistItems(updatedWishlist); */
  /* try {
    wishlist.products.push({ _id, isActive: true });
    let updatedWishlist = await wishlist.save();
    let wishlistItems = await getWishlistItems(updatedWishlist);
    res.status(200).json({ success: true, wishlist: wishlistItems });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      errMessage: err.message,
    }); */
};

/* let resStatus;
  const productExists = wishlist.products.some((product) => product._id == _id);
  if (productExists) {
    resStatus = 200;
    for (let product of wishlist.products) {
      if (product._id == _id) {
        product.isActive = !product.isActive;
        break;
      }
    }
  } else {
    resStatus = 201;
    wishlist.products.push({ _id, isActive: true });
  }

  let updatedWishlist = await wishlist.save();
  let wishlistItems = await getWishlistItems(updatedWishlist); 
  

  elete(async (req, res) => {
  try {
    const { _id } = req.params;
    const productId = await Wishlist.findByIdAndDelete(_id);
    res.status(201).json({ success: true, message: "Item deleted", productId });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "unable to delete wishlist item" });
  }
})
  
  
  */

module.exports = {
  findUserWishlist,
  getUserWishlist,
  addItemInWishlist,
};
