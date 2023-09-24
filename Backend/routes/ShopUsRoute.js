const express = require("express");
const router = express.Router();
const {
  CreateNewShopUs,
  getAllShopUs,
  updateShopUs,
  getSingleShopUs,
} = require("../controllers/ShopUsController");
const { isAuthenticatedUser } = require("../middleware/auth");
router.route("/admin/shopUs/new").post(isAuthenticatedUser, CreateNewShopUs);

router.route("/shopUs").get(getAllShopUs);

router.route("/admin/shopUs/:id").put(isAuthenticatedUser, updateShopUs);

router.route("/admin/shopUs/:id").get(getSingleShopUs);

// router.route("/admin/shopUs/:id").delete( deleteShopUs);

module.exports = router;
