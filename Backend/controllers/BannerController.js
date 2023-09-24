const ErrorHandler = require("../utils/errorhandler");
const Banner = require("../models/BannerModel");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());

//======Create Banner===========//
exports.CreateBanner = async (req, res) => {
  try {
    const image = req.file;
    const { title, status } = req.body;
    const existingBanner = await Banner.findOne({ title });
    if (existingBanner) {
      return res
        .status(409)
        .send({ status: false, msg: "This Banner already exists." });
    }

    const banner = await Banner.create({
      title,
      status,
      imageBanner: image.filename,
    });
    res.status(201).json({
      success: true,
      banner,
    });
  } catch (error) {
    res.status(500).json((message = "Not Able to Create Banner"));
  }
};

// Get all Banners
exports.getAllBanner = async (req, res) => {
  const bannerCount = await Banner.countDocuments();
  const banner = await Banner.find(req.body);
  const reversedBanner = banner.reverse();
  res.status(200).json({
    success: true,
    banner,
    banner: reversedBanner,
    bannerCount,
    message: "All Banner Find",
  });
};

// Get a single Banner by ID
exports.getSingleBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: "Single Banner Fetched",
      banner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Banner not Found",
      error,
    });
  }
};

//Update Banner
exports.updateBanner = async (req, res) => {
  try {
    const { title } = req.body;

    const existingBanner = await Banner.findOne({ title });
    if (existingBanner && existingBanner._id != req.params.id) {
      return res
        .status(409)
        .send({ status: false, msg: "This Banner already exists." });
    }
    let updateData = {
      title: req.body.title,
      imageBanner: req.body.imageBanner,
      status: req.body.status,
    };
    if (req.file) {
      updateData.imageBanner = req.file.filename;
    }
    const banner = await Banner.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a Banner by ID
exports.deleteBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return next(new ErrorHandler("Banner not found with this Id", 404));
    }
    res.status(200).json({
      success: true,
      message: "Banner Delete Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "I'm not Able to Delete Banner" });
  }
};
