const express = require("express");
const router = express.Router();
const {
  CreateNewTerms,
  getAllTerms,
  updateTerms,
  getTermsById,
} = require("../controllers/TermsController");
const { isAuthenticatedUser } = require("../middleware/auth");
router.route("/admin/terms/new").post(isAuthenticatedUser, CreateNewTerms);

router.route("/terms").get(getAllTerms);

router.route("/admin/terms/:id").put(isAuthenticatedUser, updateTerms);

router.route("/admin/terms/:id").get(getTermsById);

module.exports = router;
