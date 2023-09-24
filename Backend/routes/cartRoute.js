const express = require("express");
const router = express.Router();


const { createCartItem,  updateCartItem, deleteCartItem, getSingleCartItems,  getAllCartItems, myCartItems } = require("../controllers/cartController");

const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/cart/new").post(isAuthenticatedUser, createCartItem);

router.route("/carts").get(isAuthenticatedUser, getAllCartItems);

router.route("/cart/me").get(isAuthenticatedUser, myCartItems);

router.route("/cart/:id").get(isAuthenticatedUser, getSingleCartItems);

router.route("/cart/:id").put(isAuthenticatedUser, updateCartItem);

router.route("/cart/:id").delete(isAuthenticatedUser, deleteCartItem);

module.exports = router;
