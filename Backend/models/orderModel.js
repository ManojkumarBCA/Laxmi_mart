

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  cartItem: {
    type: mongoose.Schema.ObjectId,
    ref: "CartItem",
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  deliveryAdd: {
    type: mongoose.Schema.ObjectId,
    ref: "DeliveryAddress",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    default: "PENDING",
    enum: [
      "PENDING",
      "PROCESSING",
      "PACKED",
      "CANCELLED",
      "SHIPPED",
      "OUTFORDELIVERY",
      "DELIVERED",
      "RETURNED",
      "REFUNDED",
    ],
  },
  cancellable: {
    type: Boolean,
    default: true,
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
  deliveredAt: Date,
});

module.exports = mongoose.model("Order", orderSchema);
