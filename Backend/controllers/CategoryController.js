const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhandler");
const Category = require("../models/CategoryModel");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());

//Create Category --Admin
exports.CreateNewCategory = async (req, res) => {
  try {
    const image = req.file;
    const { title, status } = req.body;
    if (!title) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter Category title !!!" });
    }
    if (!status) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Select Category Status !!!" });
    }
    if (!image) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Select Category Image !!!" });
    }
    const existingCategory = await Category.findOne({ title });
    if (existingCategory) {
      return res
        .status(409)
        .send({ status: false, msg: "This Category already exists." });
    }
    const category = await Category.create({
      title,
      status,
      imageCategory: image.filename,
    });
    console.log(this.CreateNewCategory);
    res.status(201).json({
      success: true,
      message: "Product Category Create Successfully !!",
      category,
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// Get all categories
exports.getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.find(req.body);
    const categoryCount = await Category.countDocuments();
    const reversedCategory = category.reverse();
    res.status(200).json({
      success: true,
      message: "All Category Find",
      category: reversedCategory,
      categoryCount,
      category,
    });
  } catch (err) {
    res.status(500).json((message = "Not Able to Create Banner"));
  }
};

// Get a single category by ID
exports.getSingleCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(new ErrorHandler("Category not found with this Id", 404));
    }
    res.status(200).send({
      success: true,
      message: "Single Category Fetched",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "category not Found",
    });
  }
};

// Get a single category by ID
exports.getSingleCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(new ErrorHandler("Category not found with this Id", 404));
    }
    res.status(200).send({
      success: true,
      message: "Single Category Fetched",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "category not Found",
    });
  }
};

// Update Category
exports.updateCategory = async (req, res, next) => {
  try {
    const { title } = req.body;
    const existingCategory = await Category.findOne({ title });
    if (existingCategory && existingCategory._id != req.params.id) {
      return res
        .status(409)
        .send({ status: false, msg: "This Category already exists." });
    }
    let updateData = {
      title: req.body.title,
      status: req.body.status,
    };
    if (req.file) {
      updateData.imageCategory = req.file.filename;
    }
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Not Able to Update" });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return next(new ErrorHandler("Category not found with this Id", 404));
    }
    res.status(200).json({
      success: true,
      message: "Category Delete Successfully",
    });
  } catch (err) {
    res.status(500).json((message = "Not Able to Delete Category"));
  }
};
