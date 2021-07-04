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
    .populate("products._id")
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

const addProductInBag = async (req, res) => {
  const { _id } = req.body;
  const { bag } = req;
  try {
    bag.products.push({ _id, isInBag: true, quantity: 1 });
    let updatedBag = await bag.save();
    let bagItems = await getBagItems(updatedBag);
    res.status(201).json({ success: true, bag: bagItems });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Unable to add product in bag",
      errMessage: err.message,
    });
  }
};

const removeProductFromBag = async (req, res) => {
  const { _id } = req.body;
  const { bag } = req;
  try {
    bag.products.pull({ _id, quantity: 0, isInBag: false });
    let updatedBag = await bag.save();
    updatedBag = await getBagItems(updatedBag);
    res.status(201).json({ success: true, message: "Product removed from bag", bag: updatedBag });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Unable to add product in bag",
      errMessage: err.message,
    });
  }
};

const emptyBag = async (req, res) => {
  let { bag } = req;
  for (let product of bag.products) {
    product.quantity = 0;
  }
  let emptyBag = await bag.save();
  emptyBag = await getBagItems(emptyBag);
  res.json({ success: true, bag: emptyBag });
};


module.exports = {
  createUserBag,
  getUserBag,
  addProductInBag,
  removeProductFromBag,
  emptyBag
};