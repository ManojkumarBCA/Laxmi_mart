const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  discountType: {
    type: String,
    required: true,
    enum: ["RUPEES", "PERCENTAGE"],
  },
  discount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Available",
    enum: ["Available", "Unavailable"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Coupon", CouponSchema);
