const express = require("express");
const router = express.Router();
const { Product } = require("../models/products.model");

//Route for getting products and adding new products
router.route("/").get(async (req, res) => {
  try {
    const showProducts = await Product.find();
    res.send(showProducts);
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
});

//Get Products by specific ID
router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  try {
    const specificProduct = await Product.findById(id).lean();
    res.send(specificProduct);
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: `Product with id ${id} was not found` });
  }
});

module.exports = router;
