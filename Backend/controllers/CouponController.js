// const Coupon = require("../models/CouponModel");
const bodyParser = require("body-parser");
const validator = require("../middleware/validation");
const express = require("express");
const ErrorHandler = require("../utils/errorhandler");
const CouponModel = require("../models/CouponModel");
const app = express();
app.use(bodyParser.json());

//Create Coupon --Admin
exports.CreateNewCoupon = async (req, res) => {
  try {
    const { couponCode, discountType, discount, description,status } = req.body;
    if (!couponCode) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter Coupon Code !!!" });
    }
    if (!discountType) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter discountType !!!" });
    }
    if (!discount) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter discount !!!" });
    }
    if (!description) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter  description !!!" });
    }
    if (!status) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Select Status !!!" });
    }
    const existingCoupon = await CouponModel.findOne({ couponCode });
    if (existingCoupon) {
      return res
        .status(409)
        .send({ status: false, msg: "This Coupon already exists." });
    }
    const coupon = await CouponModel.create({
      couponCode,
      status,
      discountType,
      discount,
      description,
    });
    res.status(201).json({
      success: true,
      message: "Coupon Create Successfully !!",
      coupon,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json((message = "Not Able to Create Coupon"));
  }
};

// Get a single Child Coupon by ID
exports.getSingleCoupon = async (req, res, next) => {
  try {
    const coupon = await CouponModel.findById(req.params.id);
    if (!coupon) {
      return next(new ErrorHandler("Coupon not found with this Id", 404));
    }
    res.status(200).send({
      success: true,
      message: "Single Coupon Fetched",
      coupon,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: " Coupon not Found",
    });
  }
};

// Get all  Coupon
exports.getAllCoupon = async (req, res, next) => {
  const coupon = await CouponModel.find(req.body);
  const reversedCoupon = coupon.reverse();
  res.status(200).json({
    success: true,
    coupon,
    coupon: reversedCoupon,
    message: "All Coupons Find",
  });
};

exports.updateCoupon = async (req, res, next) => {
 try {
   const { couponCode } = req.body;

   const existingCoupon = await CouponModel.findOne({ couponCode });
   if (existingCoupon && existingCoupon._id != req.params.id) {
     return res
       .status(409)
       .send({ status: false, msg: "This Coupon already exists." });
   }
   let updateData = {
     couponCode: req.body.couponCode,
     discountType: req.body.discountType,
     discount: req.body.discount,
     description: req.body.description,
     status: req.body.status,
   };
   const coupon = await CouponModel.findByIdAndUpdate(req.params.id, updateData, {
     new: true,
   });
   res.json(coupon);
 } catch (err) {
   res.status(500).json({ message: err.message });
 }
};

// Delete a Coupon by ID
exports.deleteCoupon = async (req, res, next) => {
  try {
    const coupon = await CouponModel.findByIdAndDelete(req.params.id);
    if (!coupon) {
      return next(new ErrorHandler("Coupon not found with this Id", 404));
    }
    res.status(200).json({
      success: true,
      coupon,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: " Coupon not Found",
      Coupon,
    });
  }
};
