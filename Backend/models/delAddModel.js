const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  addType: {
    type: String,
    required: true,
  },
  ContName: {
    type: String,
    required: true,
  },
  ContactNo: {
    type: Number,
    required: true,
  },
  Street1: {
    type: String,
    required: true,
  },
  Street2: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },
  product_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("DeliveryAddress", deliverySchema);