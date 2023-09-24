const express = require("express");
const router = express.Router();
const {
  CreateNewPrivacyPolicy,
  getAllPrivacyPolicy,
  updatePrivacyPolicy,
  getSinglePrivacyPolicy,
} = require("../controllers/PrivacyPolicyController");
const { isAuthenticatedUser } = require("../middleware/auth");
router.route("/admin/privacyPolicy/new").post(isAuthenticatedUser,CreateNewPrivacyPolicy);

router.route("/privacyPolicy").get(getAllPrivacyPolicy);

router.route("/Single/privacyPolicy/:id").get(getSinglePrivacyPolicy);

router.route("/admin/privacyPolicy/:id").put(isAuthenticatedUser,updatePrivacyPolicy);

module.exports = router;
