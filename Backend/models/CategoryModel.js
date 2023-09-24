const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  imageCategory: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Available",
    enum: ["Available", "Unavailable"],
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

module.exports = mongoose.model("Category", categorySchema);
