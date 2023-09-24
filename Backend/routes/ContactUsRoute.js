const express = require("express");
const router = express.Router();
const valid = require("../middleware/validation");
const {
  newContactUs,
  getAllContactUs,
  updateContactUs,
  getSingleContactUs,
} = require("../controllers/ContactUsController");
const { isAuthenticatedUser } = require("../middleware/auth");
router
  .route("/contactUs/new")
  .post(valid.validContactUs, isAuthenticatedUser, newContactUs);

router.route("/contactUs").get(getAllContactUs);

router.route("/contactUs/:id").get( getSingleContactUs);

router.route("/contactUs/:id").put(isAuthenticatedUser, updateContactUs);

// router.route("/contactUs/:id").delete( deleteContactUs);

module.exports = router;
