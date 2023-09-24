const ErrorHandler = require("../utils/errorhandler");
const UnitProduct = require("../models/UnitProdModel");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());

//Create Unit Product --Admin
exports.CreateNewUnit = async (req, res, next) => {
  try {
    const { name, title } = req.body;

    const existingUnit = await UnitProduct.findOne({ name });
    if (existingUnit) {
      return res
        .status(409)
        .send({ status: false, msg: "This Unit already exists." });
    }

    const unitProduct = await UnitProduct.create({
      name,
      title,
    });
    res.status(201).json({
      success: true,
      unitProduct,
    });
  } catch (err) {
    res.status(500).json((message = "Not able to create Unit "));
  }
};

// Get a single Unit Product by ID
exports.getSingleUnit = async (req, res, next) => {
  try {
    const unitProduct = await UnitProduct.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: "Single Unit Product Fetched",
      unitProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unit Product not Found",
    });
  }
};

// Get all Unit Product
exports.getAllUnit = async (req, res, next) => {
  try {
    const unitProduct = await UnitProduct.find(req.body);
    const reversedUnit = unitProduct.reverse();
    res.status(200).json({
      success: true,
      unitProduct,
      unitProduct: reversedUnit,
      message: "All Unit Product Find",
    });
  } catch (err) {
    res.status(500).json((message = "Not Able to Create Product Unit Content"));
  }
};

//Update Unit Product
exports.updateUnit = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existingUnit = await UnitProduct.findOne({ name });
    if (existingUnit && existingUnit._id != req.params.id) {
      return res
        .status(409)
        .send({ status: false, msg: "This Category already exists." });
    }

    const unitProduct = await UnitProduct.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        title: req.body.title,
      },
      { new: true }
    );
    res.json(unitProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a Unit Product by ID
exports.deleteUnit = async (req, res, next) => {
  try {
    const unitProduct = await UnitProduct.findByIdAndDelete(req.params.id);
    if (!unitProduct) {
      return next(new ErrorHandler("Unit Product not found with this Id", 404));
    }
    res.status(200).json({
      success: true,
      unitProduct,
    });
  } catch (err) {
    res.status(500).json((message = "Not Able to Create Product Unit Content"));
  }
};
