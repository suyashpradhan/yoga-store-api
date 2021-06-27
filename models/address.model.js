const mongoose = require("mongoose");
const { Schema } = mongoose;

const AddressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone Number  is required"],
  },
  pincode: {
    type: Number,
    required: [true, "Pincode is required"],
  },
  locality: {
    type: String,
    required: [true, "Locality is required"],
  },
  landmark: {
    type: String,
    required: [true, "Landmark is required"],
  },
  address: {
    type: String,
    required: [true, "Streetname and area is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  state: {
    type: [String],
    default: [
      "Maharashtra",
      "Andhra Pradesh",
      "Karnataka",
      "Tamil Nadu",
      "Rajasthan",
      "Gujurat",
      "Madhya Pradesh",
      "West Bengal",
      "Haryana",
      "Uttar Pradesh",
      "Bihar",
      "Kerala",
    ],
  },
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;
