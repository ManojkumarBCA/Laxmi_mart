// const ErrorHandler = require("../utils/errorhandler");
const PrivacyPolicy = require("../models/PrivacyPolicyModel");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());

//Create Privacy Policy --Admin
exports.CreateNewPrivacyPolicy = async (req, res) => {
  try {
    const { description } = req.body;

    const privacyPolicy = await PrivacyPolicy.create({
      description,
    });
    // if (!privacyPolicy) {
    //   res.send({message:"please enter description"})
    // };
    res.status(201).json({
      success: true,
      privacyPolicy,
    });
  } catch (err) {
    res.status(500).send({
      message: "I'm Not Able to Create Privacy Policy !!",
    });
  }
};

// Get single Privacy Policy
exports.getSinglePrivacyPolicy = async (req, res, next) => {
  try {
    const privacyPolicy = await PrivacyPolicy.findById(req.params.id);
    res.status(200).json({
      success: true,
      privacyPolicy,
      message: "All Privacy Policy Find",
    });
  } catch (err) {
    res.status(500).json((message = "Not Able to fetch PrivacyPolicy Content"));
  }
};

// Get all Privacy Policy
exports.getAllPrivacyPolicy = async (req, res, next) => {
  try {
    const privacyPolicy = await PrivacyPolicy.find(req.body);
    res.status(200).json({
      success: true,
      privacyPolicy,
      message: "All Privacy Policy Find",
    });
  } catch (err) {
    res.status(500).json((message = "Not Able to fetch PrivacyPolicy Content"));
  }
};

//Update Privacy Policy
exports.updatePrivacyPolicy = async (req, res, next) => {
  try {
    const privacyPolicy = await PrivacyPolicy.findByIdAndUpdate(
      req.params.id,
      {
        description: req.body.description,
      },
      { new: true }
    );
    res.json(privacyPolicy);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Not Able to fetch PrivacyPolicy Us Content" });
  }
};
