const express = require("express");
const router = express.Router();
const {
  CreateNewAbout,
  updateAbout,
  getSingleAbout,
  getAllAbout,
  deleteAbout,
} = require("../controllers/AboutController");
const { isAuthenticatedUser } = require("../middleware/auth");
router.route("/admin/about/new").post(isAuthenticatedUser, CreateNewAbout);

router.route("/about/:id").get(getSingleAbout);

router.route("/about").get(getAllAbout);

router.route("/admin/about/:id").put(isAuthenticatedUser, updateAbout);

router.route("/admin/about/:id").delete(deleteAbout);

module.exports = router;
