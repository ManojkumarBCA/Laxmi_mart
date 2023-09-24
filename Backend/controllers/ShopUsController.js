const ShopUs = require("../models/ShopUsModel");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());

//Create Shop Us --Admin
exports.CreateNewShopUs = async (req, res) => {
  try {
    const { description } = req.body;
    const shopUs = await ShopUs.create({
      description,
    });
    res.status(201).json({
      success: true,
      message: "Create Successfully",
      shopUs,
    });
  } catch (err) {
    res.status(500).json((message = "Not Able to Create ShopUs Content"));
  }
};

// Get all Shop Us
exports.getAllShopUs = async (req, res, next) => {
  try {
    const shopUs = await ShopUs.find(req.body);
    res.status(200).json({
      success: true,
      message: "All Shop Us Find",
      shopUs,
    });
  } catch (err) {
    res.status(500).json((message = "Not Able to Fetch ShopUs Content"));
  }
};

// Get all Shop Us
exports.getSingleShopUs = async (req, res, next) => {
  try {
    const shopUs = await ShopUs.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Single Shop Us Find",
      shopUs,
    });
  } catch (err) {
    res.status(500).json((message = "Not Able to Fetch ShopUs Content"));
  }
};

//Update Shop Us
exports.updateShopUs = async (req, res, next) => {
  try {
    const shopUs = await ShopUs.findByIdAndUpdate(
      req.params.id,
      {
        description: req.body.description,
      },
      { new: true }
    );
    res.json(shopUs);
  } catch (err) {
    res.status(500).json((message = "Not Able to Fetch ShopUs Content"));
  }
};

// // Delete a Shop Us by ID
// exports.deleteShopUs = async (req, res, next) => {
//   const shopUs = await ShopUs.findByIdAndDelete(req.params.id);
//   if (!shopUs) {
//     return next(new ErrorHandler("Shop Us not found with this Id", 404));
//   }
//   res.status(200).json({
//     success: true,
//     shopUs,
//   });
// };
