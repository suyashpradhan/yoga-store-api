const mongoose = require("mongoose");
const productsData = require("../data/data");
const { Schema } = mongoose;

//Defining Product Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name Is Required"],
  },
  image: {
    type: String,
    required: [true, "image Is Required"],
  },
  originalPrice: {
    type: Number,
    required: [true, "originalPrice Is Required"],
  },
  discountedPrice: {
    type: Number,
    required: [true, "discountedPrice Is Required"],
  },
  brand: {
    type: String,
    required: [true, "brand Is Required"],
  },
  ratings: {
    type: Number,
    required: [true, "ratings Is Required"],
  },
  discount: {
    type: Number,
    required: [true, "discount Is Required"],
  },
  totalPurchase: {
    type: Number,
    required: [true, "image Is Required"],
  },
  inStock: {
    type: Boolean,
    required: [true, "inStock Is Required"],
  },
  fastDelivery: {
    type: Boolean,
    required: [true, "fastDelivery Is Required"],
  },
  yogaAssured: {
    type: Boolean,
    required: [true, "yogaAssured Is Required"],
  },
  availableQty: {
    type: Number,
    required: [true, "availableQty Is Required"],
  },
});

//Creating New Model
const Product = mongoose.model("Product", ProductSchema);

//Adding products into our model
const products = async () => {
  try {
    productsData.forEach(async (product) => {
      const newProduct = new Product(product);
      const savedProduct = await newProduct.save();
    });
  } catch (error) {
    console.log(error);
  }
};

//Exporting Model and Function
module.exports = { Product, products };
