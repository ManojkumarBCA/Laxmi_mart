const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.String,
    ref: "Category",
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.String,
    ref: "SubCategory",
    required: true,
  },
  Brand: {
    type: mongoose.Schema.Types.String,
    ref: "Brand",
  },
  productUnit: {
    type: mongoose.Schema.Types.String,
    ref: "UnitProduct",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attributeType: {
    type: String,
    default: "Unisex",
    enum: ["Men", "Women", "Unisex"],
  },
  status: {
    type: String,
    default: "Available",
    enum: ["Available", "Unavailable"],
  },
  price: {
    type: Number,
    required: true,
  },
  // ratings: {
  //   type: Number,
  //   default: 0,
  // },
  titleImage: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  Stock: {
    type: Number,
    required: true,
    default: 1,
  },
  // numOfReviews: {
  //   type: Number,
  //   default: 0,
  // },
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

module.exports = mongoose.model("Product", productSchema);
