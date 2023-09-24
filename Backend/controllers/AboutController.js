const About = require("../models/AboutModel");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());

//Create About Us --Admin
exports.CreateNewAbout = async (req, res) => {
  try {
    const about = await About.create(req.body);
    res.status(200).json({
      success: true,
      about,
      message: "Create Successfully",
    });
  } catch (err) {
    res.status(500).json((message = "Not Able to Create AboutUs Content"));
  }
};

// Get all About Us
exports.getAllAbout = async (req, res, next) => {
  try {
    const about = await About.find(req.body);
    res.status(200).json({
      success: true,
      about,
      message: "All About Us Find",
    });
  } catch (err) {
    res.status(500).json((message = "Not Able to Fetch AboutUs Content"));
  }
};

// Get Single About Us
exports.getSingleAbout = async (req, res, next) => {
  try {
    const about = await About.findById(req.params.id);
    res.status(200).json({
      success: true,
      about,
      message: "Find About Us Content",
    });
  } catch (err) {
    res.status(500).json((message = "Not Able to fetch About Us Content"));
  }
};

//Update About Us
exports.updateAbout = async (req, res, next) => {
  try {
    const about = await About.findByIdAndUpdate(
      req.params.id,
      {
        description: req.body.description,
      },
      { new: true }
    );
    res.json(about);
  } catch (err) {
    res.status(500).json((message = "About Us Content not found with this ID"));
  }
};

// Delete a Brand by ID
exports.deleteAbout = async (req, res, next) => {
  try {
    const about = await About.findByIdAndDelete(req.params.id);
    if (!about) {
      return next(new ErrorHandler("About not found with this Id", 404));
    }
    res.status(200).json({
      success: true,
      message: "About Delete Successfully",
    });
  } catch (err) {
    res.status(500).json((message = "Not Able to Delete About"));
  }
};
