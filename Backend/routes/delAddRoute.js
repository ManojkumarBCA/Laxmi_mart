const express = require("express");
const router = express.Router();
const valid = require("../middleware/validation");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  shippingAddress,
  getShippingAddress,
  getAllAddress,
  updateAddress,
  deleteAddress,
  myShipping,
} = require("../controllers/delAddController");

router
  .route("/address/new")
  .post(valid.validShipping, isAuthenticatedUser, shippingAddress);

router.route("/address/:id").get(getShippingAddress);

router.route("/my/address").get(isAuthenticatedUser, myShipping);

router.route("/address/:id").patch(isAuthenticatedUser, updateAddress);

router.route("/addresses").get(getAllAddress);

router.route("/address/:id").delete(isAuthenticatedUser, deleteAddress);

module.exports = router;
