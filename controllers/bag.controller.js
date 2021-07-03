const { Bag } = require("../models/bag.model");

const createUserBag = async (req, res, next) => {
  try {
    const { user } = req;
    let bag = await Bag.findOne({ userId: user._id });

    if (!bag) {
      bag = new Bag({ userId: user._id, products: [] });
      bag = await bag.save();
    }

    req.bag = bag;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrive Bag details",
      errorMessage: error.message,
    });
  }
};

const getBagItems = async (bag) => {
  bag.products = bag.products.filter((product) => product.isInBag);
  bag = await bag
    .populate({ path: "products._id" })
    .execPopulate();
  return bag.products.map((product) => product);
};

const getUserBag = async (req, res) => {
  try {
    let { bag } = req;
    let bagItems = await getBagItems(bag);
    res.json({ success: true, bag: bagItems });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to retrive the bag",
      errMessage: err.message,
    });
  }
};


module.exports = {
  createUserBag,
  getUserBag,
  bagAction,
  emptyBag
};