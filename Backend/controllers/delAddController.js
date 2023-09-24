// const = require("../middleware/);
// const { loginAdmin } = require("./loginController");
// const Order = require("../models/orderModel");

const DeliveryAddress = require("../models/delAddModel");
const ProductModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());

// Create Shipping Address
exports.shippingAddress = async (req, res, next) => {
  try {
    let body = JSON.parse(JSON.stringify(req.body));
    let {
      addType,
      ContName,
      ContactNo,
      Street1,
      Street2,
      pinCode,
      city,
      state,
      country,
      product_id,
    } = body;
    let ShippingData = {
      addType,
      ContName,
      ContactNo,
      Street1,
      Street2,
      pinCode,
      city,
      state,
      country,
      product_id,
      user: req.user._id,
    };
    const saveData = await DeliveryAddress.create(ShippingData);
    res.status(201).send({ status: true, message: "Success", data: saveData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// Get  Single Shipping Address
exports.getShippingAddress = async (req, res, next) => {
  try {
    const address = await DeliveryAddress.findById(req.params.id);
    if (!address) {
      return next(
        new ErrorHandler("Shipping Address not found with this Id", 404)
      );
    }
    res.status(200).send({
      success: true,
      message: "Shipping Address Fetched",
      address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Address Not Found",
    });
  }
};

// Get logged in user  Order
exports.myShipping = async (req, res, next) => {
  const addresses = await DeliveryAddress.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    // totalProduct,
    addresses,
  });
};

//Get All Shipping Address
exports.getAllAddress = async (req, res, next) => {
  const address = await DeliveryAddress.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "ProdData",
      },
    },
    {
      $unwind: "$ProdData",
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userData",
      },
    },
    {
      $unwind: "$userData",
    },
  ]);

  res.status(200).json({
    success: true,
    address,
  });
};

// Update Address Details
exports.updateAddress = async (req, res, next) => {
  try {
    const updateDeliveryAddress = await DeliveryAddress.findByIdAndUpdate(
      req.params.id,
      {
        addType: req.body.addType,
        ContName: req.body.ContName,
        ContactNo: req.body.ContactNo,
        Street1: req.body.Street1,
        Street2: req.body.Street2,
        pinCode: req.body.pinCode,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
      },
      { new: true }
    );

    res.json(updateDeliveryAddress);
  } catch (error) {
    res.status(400).json({ message: "Not Able to Update Shipping Address" });
  }
};

//Delete Product
exports.deleteAddress = async (req, res, next) => {
  try {
    const address = await DeliveryAddress.findByIdAndDelete(req.params.id);
    if (!address) {
      return next(new ErrorHandler("Address not found", 404));
    }
    //await product.remove();
    res.status(200).json({
      success: true,
      message: "Address Delete Successfully",
    });
  } catch (err) {
    res.status(500).send({
      error:
        "Shipping Address not Found With this id, Please Enter Correct Shipping Id",
    });
  }
};
