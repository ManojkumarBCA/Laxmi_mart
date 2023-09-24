const CartItem = require("../models/cartModel");
const Order = require("../models/orderModel");
// const UserModel = require("../models/userModel");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());

exports.createCartItem = async (req, res) => {
  try {
    let body = JSON.parse(JSON.stringify(req.body));
    // const userIdFromParams = req.body.user;
    let { items, totalPrice, totalItems, deliveryAdd, cartItem } = body;
    let cartData = {
      items,
      totalPrice,
      totalItems,
      deliveryAdd,
      cartItem,
      user: req.user._id,
    };
    if (!items) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter items !!!" });
    };
    if (!totalPrice) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter totalPrice !!!" });
    };
    if (!totalItems) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter totalItems !!!" });
    };
    if (!deliveryAdd) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter deliveryAdd Id !!!" });
    };
    const saveData = await CartItem.create(cartData);
    res.status(201).send({ status: true, message: "Success", data: saveData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//Get CartItems
exports.getAllCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find();

    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get logged in user  carts
exports.myCartItems = async (req, res, next) => {
  const cartItems = await CartItem.find({ user: req.user._id });

  let totalPrice = 0;
  cartItems.forEach((Order) => {
    totalPrice += Order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalPrice,
    cartItems,
  });
};

// Get Single cartItems
exports.getSingleCartItems = async (req, res, next) => {
  const cartItems = await CartItem.findById(req.params.id);

  if (!cartItems) {
    return next(new ErrorHandler("cartItems not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    cartItems,
  });
};

//Update CartItem
exports.updateCartItem = async (req, res) => {
  try {
    const cartItems = await CartItem.findByIdAndUpdate(
      req.params.id,
      {
        totalPrice: req.body.totalPrice,
        items: req.body.items,
        totalItems: req.body.totalItems,
        quantity: req.body.quantity,
        product: req.body.product,
        user: req.user._id,
      },
      { new: true }
    );
    return res.status(200).send({
      msg: "Updated Successfully",
      status: true,
      cartItems,
    });
    // res.json(cartItems);
  } catch (error) {
    res
      .status(500)
      .send({
        error:
          "I'm Not Able to update Cart with this Id , Please Enter Correct Id",
      });
  }
};

//Delete CartItems
exports.deleteCartItem = async (req, res) => {
  try {
    // Find the cart item by id and delete it
    const result = await CartItem.findByIdAndDelete(req.params.id);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
