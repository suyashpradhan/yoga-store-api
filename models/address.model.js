const mongoose = require("mongoose");
const { Schema } = mongoose;

const AddressSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
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
  country: {
    type: String,
    required: "Country/Region attribute is required",
  },
  pinCode: {
    type: Number,
    minLength: [6, "Invalid pinCode"],
    maxLength: [6, "Invalid pinCode"],
    required: "Area pincode is required",
    validate: {
      validator: (pinCode) => {
        return /^[1-9][0-9]{5}$/.test(pinCode);
      },
      message: (props) => `${props.value} is not a valid area pincode!`,
    },
  },
  mobileNumber: {
    type: Number,
    minLength: [10, "Invalid mobile number"],
    maxLength: [10, "Invalid mobile number"],
    required: "Mobile number is required",
    validate: {
      validator: (mobileNo) => {
        return /^[6-9][0-9]{9}$/.test(mobileNo);
      },
      message: (props) => `${props.value} is not a valid mobile number!`,
    },
  },
  isActive: Boolean
},
  {
    timestamps: true,
  }
);

const UserAddressSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "UserId is required",
  },
  addresses: [AddressSchema],
});

const Address = mongoose.model("Address", UserAddressSchema);

module.exports = Address;