const ErrorHandler = require("../utils/errorhandler");
const Brand = require("../models/BrandModel");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());

//Create Brand
exports.createNewBrand = async (req, res) => {
  try {
    const image = req.file;
    const { category, subcategory,name, status } = req.body;
    if (!category) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter Brand category !!!" });
    }
    if (!subcategory) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter Brand subcategory !!!" });
    }
    if (!name) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter Brand Name !!!" });
    }
    if (!status) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Select Status !!!" });
    }
    if (!image) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Select Brand Image !!!" });
    }

    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      return res
        .status(409)
        .send({ status: false, msg: "This brand already exists." });
    }

    const brand = await Brand.create({
      category,
      subcategory,
      name,
      status,
      imageBrand: image.filename,
    });
    res.status(201).json({
      success: true,
      message: "Product Category Create Successfully !!",
      brand,
    });
  } catch (error) {
    res.status(500).json((message = "Not Able to Create Banner"));
  }
};

// Get all Brand
exports.getAllBrand = async (req, res, next) => {
  const brandCount = await Brand.countDocuments();
  const brands = await Brand.find();
  const reversedBrand = brands.reverse();
  // console.log(brands);

  res.status(200).json({
    success: true,
    brands,
    brands: reversedBrand,
    brandCount,
    message: "All Find",
  });
};

// Get a single Brand by ID
exports.getSingleBrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById({ _id: id });

    res.status(200).send({
      success: true,
      message: "Single Brand Fetched",
      brand,
    });
  } catch (err) {
    res.status(500).json((message = "Not Able to fetch Brand"));
  }
};

//Update Brand
exports.updateBrand = async (req, res, next) => {
  try {
    const { name } = req.body;

    const existingBrand = await Brand.findOne({ name });
    if (existingBrand && existingBrand._id != req.params.id) {
      return res
        .status(409)
        .send({ status: false, msg: "This brand already exists." });
    }
    let updateData = {
      category: req.body.category,
      subcategory: req.body.subcategory,
      name: req.body.name,
      imageBrand: req.body.imageBrand,
      status: req.body.status,
    };
    if (req.file) {
      updateData.imageBrand = req.file.filename;
    }
    const brand = await Brand.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a Brand by ID
exports.deleteBrand = async (req, res, next) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      return next(new ErrorHandler("Brand not found with this Id", 404));
    }
    res.status(200).json({
      success: true,
      message: "Brand Delete Successfully",
    });
  } catch (err) {
    res.status(500).json((message = "Not Able to Delete Brand"));
  }
};
