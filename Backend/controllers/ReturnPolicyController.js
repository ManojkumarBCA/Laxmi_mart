// const ErrorHandler = require("../utils/errorhandler");
const ReturnPolicy = require("../models/ReturnPolicyModel");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());

//Create Privacy Policy --Admin
exports.CreateNewReturnPolicy = async (req, res) => {
  try {
    const { description } = req.body;

    const returnPolicy = await ReturnPolicy.create({
      description,
    });
    res.status(201).json({
      success: true,
      returnPolicy,
    });
  } catch (err) {
    res
      .status(500)
      .json((message = "Not Able to Create Return Policy Content"));
  }
};

// Get all Privacy Policy
exports.getAllReturnPolicy = async (req, res, next) => {
  try {
    const returnPolicy = await ReturnPolicy.find(req.body);
    res.status(200).json({
      success: true,
      returnPolicy,
      message: "All Return Policy Find",
    });
  } catch (err) {
    res.status(500).json((message = "Not Able to fetch Return Policy Content"));
  }
};

// Get Single Privacy Policy
exports.getSingleReturnPolicy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const returnPolicy = await ReturnPolicy.findById({ _id: id });
    res.status(200).json({
      success: true,
      message: "Find Single Return Policy",
      returnPolicy,
    });
  } catch (err) {
    res.status(500).json((message = "Not Able to fetch Return Policy Content"));
  }
};

//Update Privacy Policy
exports.updateReturnPolicy = async (req, res, next) => {
  try {
    const returnPolicy = await ReturnPolicy.findByIdAndUpdate(
      req.params.id,
      {
        description: req.body.description,
      },
      { new: true }
    );
    res.json(returnPolicy);
  } catch (err) {
    res.status(500).json((message = "Not Able to fetch Return Policy Content"));
  }
};
