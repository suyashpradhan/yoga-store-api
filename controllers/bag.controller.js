const { Bag } = require("../models/bag.model");
const { populateProducts } = require("../utils/populateProducts.util")

const createUserBagDocument = async (req, res, next) => {
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
      message: "Unable to retrive bag details",
      errorMessage: error.message,
    });
  }
};

const fetchUserBag = async (req, res) => {
  try {
    let { bag } = req;
    let bagItems = await populateProducts(bag);
    res.json({ success: true, bag: bagItems });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to retrive the bag",
      errMessage: err.message,
    });
  }
};

const actionOnBag = async (req, res) => {
  const { _id } = req.body;
  const { bag } = req;
  bag.products.push({ _id, isActive: true, quantity: 1 });
  let updatedBag = await bag.save();
  updatedBag = await populateProducts(updatedBag);
  res.status(201).json({ success: true, bag: updatedBag });
};

const emptyBag = async (req, res) => {
  let { bag } = req;
  for (let product of bag.products) {
    product.quantity = 0;
    product.isActive = false;
  }
  let emptyBag = await bag.save();
  emptyBag = await populateProducts(emptyBag);
  res.json({ success: true, bag: emptyBag });
};

module.exports = {
  createUserBagDocument,
  fetchUserBag,
  actionOnBag,
  emptyBag
};
