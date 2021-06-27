const mongoose = require("mongoose");
const { Schema } = mongoose;

const bagSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
  },
});

const Bag = mongoose.model("Bag", bagSchema);

module.exports = { Bag };
