const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const clothesSchema = new mongoose.Schema({
  top: {
    type: Number,
    trim: true,
  },
  pants: {
    type: Number,
    trim: true,
  },
  sweater: {
    type: Number,
    trim: true,
  },
  jacket: {
    type: Number,
    trim: true,
  },
  coat: {
    type: Number,
    trim: true,
  },
  skirt: {
    type: Number,
    trim: true,
  },
  dress: {
    type: Number,
    trim: true,
  },
  other: {
    type: Number,
    trim: true,
  },
  _id: false,
});

const totalSchema = new mongoose.Schema({
  subtotal: {
    type: String,
    trim: true,
  },
  total: {
    type: String,
    trim: true,
  },
  tax: {
    type: String,
    trim: true,
  },
  _id: false,
});

const coordsSchema = new mongoose.Schema({
  lat: {
    type: Number,
    trim: true,
  },
  lng: {
    type: Number,
    trim: true,
  },
  _id: false,
});

const orderSchema = new mongoose.Schema({
  fullName: {
    type: String,
    // required: [true, "user must have a name"],
    trim: true,
  },
  phone: {
    type: String,
    // required: [true, "user must have a name"],
    trim: true,
  },
  street: {
    type: String,
    // required: [true, "user must have a name"],
    trim: true,
  },
  city: {
    type: String,
    // required: [true, "you must provide an email address"],
  },
  date: {
    type: Date,
    // required: [true, "you must provide a phone number"],
    // trim: true,
  },
  googleId: {
    type: String,
    // required: [true, "you must provide an address"],
    trim: true,
  },
  userId: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    // required: [true, "you must provide an address"],
    trim: true,
  },
  acceptId: {
    type: String,
    // required: [true, "you must provide a Google Id"],
    trim: true,
  },
  acceptDate: {
    type: Date,
  },
  completedDate: {
    type: Date,
  },
  distance: {
    type: Number,
    // required: [true, "you must provide a Google Id"],
    trim: true,
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
  clothes: {
    type: clothesSchema,
  },
  total: {
    type: totalSchema,
  },
  coords: {
    type: coordsSchema,
  },
});

const userOrderSchema = new mongoose.Schema({
  fullName: {
    type: String,
    // required: [true, "user must have a name"],
    trim: true,
  },
  phone: {
    type: String,
    // required: [true, "user must have a name"],
    trim: true,
  },
  street: {
    type: String,
    // required: [true, "user must have a name"],
    trim: true,
  },
  city: {
    type: String,
    // required: [true, "you must provide an email address"],
  },
  date: {
    type: Date,
    // required: [true, "you must provide a phone number"],
    // trim: true,
  },
  googleId: {
    type: String,
    // required: [true, "you must provide an address"],
    trim: true,
  },
  userId: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    // required: [true, "you must provide an address"],
    trim: true,
  },
  acceptId: {
    type: String,
    // required: [true, "you must provide a Google Id"],
    trim: true,
  },
  acceptDate: {
    type: Date,
  },
  completedDate: {
    type: Date,
  },
  distance: {
    type: Number,
    // required: [true, "you must provide a Google Id"],
    trim: true,
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
  clothes: {
    type: clothesSchema,
  },
  total: {
    type: totalSchema,
  },
  coords: {
    type: coordsSchema,
  },
});

orderSchema.plugin(AutoIncrement, { inc_field: "ticketId" });

const Order = mongoose.model("Order", orderSchema);

module.exports = {
  Order,
  userOrderSchema,
  coordsSchema,
  totalSchema,
  clothesSchema,
};
