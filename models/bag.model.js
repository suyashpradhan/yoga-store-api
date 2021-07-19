const mongoose = require("mongoose");
const { Schema } = mongoose;

const BagItemSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
  },
  isActive: {
    type: Boolean
  }
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
