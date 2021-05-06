const mongoose = require("mongoose");
const productsData = require("../data/data");
const { Schema } = mongoose;

//Defining Product Schema
const ProductSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  image: String,
  originalPrice: Number,
  discountedPrice: Number,
  category: String,
  brand: String,
  ratings: Number,
  discount: Number,
  totalPurchase: Number,
  inStock: Boolean,
  fastDelivery: Boolean,
  yogaAssured: Boolean,
  availableQty: Number,
});

//Creating New Model
const Product = mongoose.model("product", ProductSchema);

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
