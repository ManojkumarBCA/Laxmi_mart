const express = require("express");
const router = express.Router();
const valid = require("../middleware/validation");

const {
  createReview,
  getAllReview,
  updateReview,
  deleteReview,
  myReview,
  getReviewsByProductId,
} = require("../controllers/reviewController");

router.route("/review/new").post(valid.validReview, createReview);

router.route("/review/me").get(myReview);

router.route("/review/:id").get(getReviewsByProductId);

router.route("/reviews").get(getAllReview);

router.route("/review/:id").put(updateReview);

router.route("/review/:id").delete(deleteReview);

module.exports = router;
