const { Bag } = require("../models/bag.model");
const { populateBagProducts } = require("../utils/populateProducts.util")

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
    let bagItems = await populateBagProducts(bag);
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
  const { _id, action } = req.body;
  const { bag } = req;
  const productExists = bag.products.some((product) => product._id == _id);
  if (productExists) {
    for (let product of bag.products) {
      if (product._id == _id) {
        switch (action.toUpperCase()) {
          case "ADD_PRODUCT_IN_BAG": product.quantity = product.quantity + 1;
            break;
          case "REMOVE_PRODUCT_FROM_BAG":
            product.isActive = false;
            break;
        }
        product.quantity > 0 ? (product.isActive = true) : (product.isActive = false);
        break;
      }
    }
  } else {
    bag.products.push({ _id, quantity: 1, isActive: true });
  }

  let updatedBag = await bag.save();
  updatedBag = await populateBagProducts(updatedBag);
  res.status(201).json({ success: true, bag: updatedBag });
};

const emptyBag = async (req, res) => {
  let { bag } = req;
  for (let product of bag.products) {
    product.quantity = 0;
    product.isActive = false;
  }
  let emptyBag = await bag.save();
  emptyBag = await populateBagProducts(emptyBag);
  res.json({ success: true, bag: emptyBag });
};

module.exports = {
  createUserBagDocument,
  fetchUserBag,
  actionOnBag,
  emptyBag
};
