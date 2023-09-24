// const ErrorHandler = require("../utils/errorhandler");
const Terms = require("../models/TermsModel");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());

//Create Terms & Conditions --Admin
exports.CreateNewTerms = async (req, res) => {
  try {
    const { description } = req.body;
    const terms = await Terms.create({
      description,
    });
    res.status(201).json({
      success: true,
      terms,
    });
  } catch (err) {
    res
      .status(500)
      .json((message = "Not Able to Create Terms & Conditions Content"));
  }
};

// Get all Terms & Conditions
exports.getAllTerms = async (req, res, next) => {
  try {
    const terms = await Terms.find(req.body);
    res.status(200).json({
      success: true,
      terms,
      message: "All Terms & Conditions Find",
    });
  } catch (err) {
    res
      .status(500)
      .json((message = "Not Able to Get Terms & Conditions Content"));
  }
};

// Get all Terms & Conditions
exports.getTermsById = async (req, res, next) => {
  try {
    const terms = await Terms.findById(req.params.id);
    res.status(200).json({
      success: true,
      terms,
      message: "Single Terms & Conditions Find",
    });
  } catch (err) {
    res
      .status(500)
      .json((message = "Not Able to Get Terms & Conditions Content"));
  }
};

//Update Terms & Conditions
exports.updateTerms = async (req, res, next) => {
  try {
    const terms = await Terms.findByIdAndUpdate(
      req.params.id,
      {
        description: req.body.description,
      },
      { new: true }
    );
    res.json(terms);
  } catch (err) {
    res
      .status(500)
      .json((message = "Not Able to Create Terms & Conditions Content"));
  }
};
