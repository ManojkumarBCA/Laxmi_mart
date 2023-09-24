const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Available",
    enum: ["Available", "Unavailable"],
  },
  imageBanner: {
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

module.exports = mongoose.model("Banner", bannerSchema);
