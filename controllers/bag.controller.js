const { Bag } = require("../models/bag.model");
const { extend } = require('lodash');

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


const populateBag = async (req, res) => {
  try {
    let { bag } = req;

    bag = await bag
      .populate({
        path: 'products.product',
        select: "availableQty brand discount discountedPrice fastDelivery image inStock name originalPrice ratings totalPurchase yogaAssured"
      })
      .execPopulate();

    const activeProductsInBag = bag.products.filter((item) => item.isActive);

    res.status(200).json({
      products: activeProductsInBag,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message,
    });
  }
};

const addOrUpdateProductInBag = async (req, res) => {
  try {
    const productUpdates = req.body;
    const { bag } = req;

    const isProductAlreadyAdded = bag.products.find(
      (product) => product.product == productUpdates._id,
    );

    if (isProductAlreadyAdded) {
      bag.products = bag.products.map((product) =>
        productUpdates._id == product.product
          ? extend(product, productUpdates)
          : product,
      );
    } else {
      bag.products.push({
        product: productUpdates._id,
        quantity: 1,
        isActive: true,
      });
    }
    let updatedBag = await bag.save();
    updatedBag = await updatedBag
      .populate({
        path: 'products.product',
        select: "availableQty brand discount discountedPrice fastDelivery image inStock name originalPrice ratings totalPurchase yogaAssured"
      })
      .execPopulate();

    const activeProductsInBag = updatedBag.products.filter(
      (item) => item.isActive,
    );

    res.status(200).json({
      products: activeProductsInBag,
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message,
    });
  }
};


module.exports = {
  createUserBagDocument,
  populateBag,
  addOrUpdateProductInBag
};
