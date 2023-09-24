const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.String,
    ref: "Category",
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
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

module.exports = mongoose.model("SubCategory", subCategorySchema);
