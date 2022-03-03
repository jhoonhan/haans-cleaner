const mongoose = require("mongoose");

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
});

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    // required: [true, "user must have a name"],
    trim: true,
  },
  firstname: {
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
    type: Number,
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
});

const User = mongoose.model("User", userSchema);

module.exports = User;
