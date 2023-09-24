const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
    trim: true,
    unique: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Product",
        trim: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      _id: 0,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
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

module.exports = mongoose.model("CartItem", cartItemSchema);
