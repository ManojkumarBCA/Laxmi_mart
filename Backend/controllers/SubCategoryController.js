// const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhandler");
const SubCategory = require("../models/SubCategoryModel");
const Category = require("../models/CategoryModel");
const bodyParser = require("body-parser");
const express = require("express");
const CategoryModel = require("../models/CategoryModel");
const app = express();
app.use(bodyParser.json());

//Create Category --Admin
exports.CreateNewSubCategory = async (req, res, next) => {
  try {
    const parentImage = req.file;
    const { title, category } = req.body;
    const existingSubCategory = await SubCategory.findOne({ title });
    if (existingSubCategory) {
      return res
        .status(409)
        .send({ status: false, msg: "This Sub Category already exists." });
    }

    const subCategory = await SubCategory.create({
      title,
      category,
      image: parentImage.filename,
    });
    res.status(201).json({
      success: true,
      subCategory,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json((message = "Not Able to Create Sub Category"));
  }
};

// Get all categories
exports.getAllSubCategory = async (req, res, next) => {
  try {
    const subCategory = await SubCategory.find(req.body);
    const categoryCount = await SubCategory.countDocuments();

    // Reverse the order of the subCategory array
    const reversedSubCategory = subCategory.reverse();

    res.status(200).json({
      success: true,
      subCategory: reversedSubCategory,
      categoryCount,
      message: "All Sub Categories Found",
    });
  } catch (err) {
    res.status(400).json({ message: "Unable to Retrieve Sub Categories" });
  }
};

// Get a single category by ID
exports.getSingleSubCategory = async (req, res, next) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: "Single Sub Category Fetched",
      subCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Sub Category not Found",
      error,
    });
  }
};

exports.updateSubCategory = async (req, res, next) => {
  try {
    const { title } = req.body;
    const existingSubCategory = await SubCategory.findOne({ title });
    if (existingSubCategory && existingSubCategory._id != req.params.id) {
      return res.status(409).send({
        status: false,
        msg: "This Sub Category Title already exists.",
      });
    }

    let updateData = {
      title: req.body.title,
      category: req.body.category,
      status: req.body.status,
    };
    if (req.file) {
      updateData.image = req.file.filename;
    }
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      updateData, // Use the updateData object here
      { new: true }
    );
    res.json(subCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a category by ID
exports.deleteSubCategory = async (req, res, next) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subCategory) {
      return next(new ErrorHandler("Sub Category not found with this Id", 404));
    }
    res.status(200).json({
      success: true,
      subCategory,
    });
  } catch (err) {
    res.status(500).json((message = "Not Able to Create Banner"));
  }
};
