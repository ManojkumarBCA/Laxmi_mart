const express = require("express");
const router = express.Router();
// const valid = require("../middleware/validation");
const {
  deleteCoupon,
  getSingleCoupon,
  getAllCoupon,
  updateCoupon,
  CreateNewCoupon,
} = require("../controllers/CouponController");
const { isArguments } = require("lodash");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/admin/Coupon/new").post(isAuthenticatedUser, CreateNewCoupon);

router.route("/Coupons").get(getAllCoupon);

router.route("/admin/Coupon/:id").put(isAuthenticatedUser, updateCoupon);

router.route("/admin/Coupon/:id").get(getSingleCoupon);

router.route("/admin/Coupon/:id").delete(deleteCoupon);

module.exports = router;
