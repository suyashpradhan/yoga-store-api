const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
  quantity: Number,
  isInCart: Boolean,
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = { Cart };


