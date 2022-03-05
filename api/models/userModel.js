const mongoose = require("mongoose");
const {
  orderSchema,
  coordsSchema,
  totalSchema,
  clothesSchema,
} = require("./orderModel");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  zip: {
    type: Number,
    trim: true,
  },
  _id: false,
});

const userSchema = new mongoose.Schema({
  completedOrders: {
    type: Array,
  },
  fullName: {
    type: String,
    // required: [true, "user must have a name"],
    trim: true,
  },
  firstName: {
    type: String,
    // required: [true, "user must have a name"],
    trim: true,
  },
  lastName: {
    type: String,
    // required: [true, "user must have a name"],
    trim: true,
  },
  email: {
    type: String,
    // required: [true, "you must provide an email address"],
  },
  phone: {
    type: String,
    // required: [true, "you must provide a phone number"],
    trim: true,
  },
  street: {
    type: String,
    // required: [true, "you must provide an address"],
    trim: true,
  },
  city: {
    type: String,
    // required: [true, "you must provide an address"],
    trim: true,
  },
  zip: {
    type: Number,
    // required: [true, "you must provide an address"],
    trim: true,
  },
  googleId: {
    type: String,
    // required: [true, "you must provide a Google Id"],
    trim: true,
  },
  defaultAddress: {
    type: addressSchema,
  },
  savedAddress: {
    type: [addressSchema],
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
  orders: {
    type: [orderSchema],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
