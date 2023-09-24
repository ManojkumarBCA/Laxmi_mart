const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Please Enter description"],
  },
});

module.exports = mongoose.model("About", AboutSchema);
