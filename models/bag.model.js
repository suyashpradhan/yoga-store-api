const mongoose = require("mongoose");
const { Schema } = mongoose;

const BagItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: [true, "Product quantity is required"],
    default: 1,
  },
});

const BagSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [BagItemSchema],
});

const Bag = mongoose.model("Bag", BagSchema);

module.exports = { Bag };
