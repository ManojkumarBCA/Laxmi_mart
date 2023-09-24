const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
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
  name: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    default: "Available",
    enum: ["Available", "Unavailable"],
  },
  imageBrand: {
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

module.exports = mongoose.model("Brand", brandSchema);
