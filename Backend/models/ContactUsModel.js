const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  address: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },
  contNo: {
    type: Number,
    required: true,
    trim: true,
  },
  GoogleLink: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ContactUs", ContactUsSchema);
