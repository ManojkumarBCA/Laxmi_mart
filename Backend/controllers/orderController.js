const orderModel = require("../models/orderModel");
const Order = require("../models/orderModel");

const ErrorHandler = require("../utils/errorhandler");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());

//Create new order
exports.newOrder = async (req, res, next) => {
  try {
    let body = JSON.parse(JSON.stringify(req.body));
    let { price, quantity, orderStatus, user, product, deliveryAdd, cartItem } =
      body;
    let orderData = {
      price,
      quantity,
      orderStatus,
      deliveryAdd,
      cartItem,
      user,
      product,
    };
    const saveData = await orderModel.create(orderData);
    res.status(201).send({ status: true, message: "Success", data: saveData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// Get Single Order
exports.getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
    res.status(200).send({
      success: true,
      message: "Single Order Fetched",
      order,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: " Order not Found",
    });
  }
};

// Get logged in user  Order
exports.myOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount += order.price;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get All Orders --Admin
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productsData",
        },
      },
      {
        $unwind: "$productsData",
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
      {
        $lookup: {
          from: "deliveryaddresses",
          localField: "deliveryAdd",
          foreignField: "_id",
          as: "shippingData",
        },
      },
      {
        $unwind: "$shippingData",
      },
    ]);
    console.log(orders);
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update Order Status --Admin
exports.updateOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    // console.log(updates);

    const result = await Order.findByIdAndUpdate(id, updates);

    return res.status(200).send({
      msg: "Updated Successfully",
      status: true,
      result,
    });
  } catch (error) {
    res.status(500).send({
      error: "Order not Found With this id, Please Enter Correct Order Id",
    });
  }
};

// Delete  Order --Admin
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this Id 😓", 404));
    }

    // await order.remove();
    res.status(200).json({
      success: true,
      message: "Order Delete Successfully 😊 ",
    });
  } catch (err) {
    res.status(500).send({
      error: "Order not Found With this id, Please Enter Correct Order Id",
    });
  }
};
