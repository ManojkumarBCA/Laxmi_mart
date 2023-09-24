const mongoose = require("mongoose");

const UnitProductSchema = new mongoose.Schema({
  //   CouponId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Coupon",
  //   },
  name: {
    type: String,
    required: true,
    unique:true
  },
  title: {
    type: String,
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

module.exports = mongoose.model("UnitProduct", UnitProductSchema);
