const express = require("express");
const router = express.Router();
const {
  CreateNewReturnPolicy,
  getAllReturnPolicy,
  updateReturnPolicy,
  getSingleReturnPolicy,
} = require("../controllers/ReturnPolicyController");
const { isAuthenticatedUser } = require("../middleware/auth");
router
  .route("/admin/returnPolicy/new")
  .post(isAuthenticatedUser, CreateNewReturnPolicy);

router.route("/returnPolicy").get(getAllReturnPolicy);

router
  .route("/admin/returnPolicy/:id")
  .put(isAuthenticatedUser, updateReturnPolicy);

router.route("/admin/returnPolicy/:id").get(getSingleReturnPolicy);

module.exports = router;
