const express = require("express");
const router = express.Router();
const valid = require("../middleware/validation");

const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser } = require("../middleware/auth");

router
  .route("/order/new")
  .post(valid.validOrder, isAuthenticatedUser, newOrder);

router.route("/order/:id").get(getSingleOrder);

router.route("/orders/me").get(myOrders);

router.route("/all/orders").get(getAllOrders);

router.route("/order/:id").put(isAuthenticatedUser, updateOrder);

router.route("/admin/order/:id").delete(deleteOrder);

module.exports = router;
