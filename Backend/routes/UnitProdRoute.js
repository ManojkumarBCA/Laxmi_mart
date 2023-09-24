const express = require("express");
const router = express.Router();
const {
  CreateNewUnit,
  getSingleUnit,
  updateUnit,
  getAllUnit,
  deleteUnit,
} = require("../controllers/UnitProdController");
const { isAuthenticatedUser } = require("../middleware/auth");
router.route("/admin/unit/new").post(isAuthenticatedUser, CreateNewUnit);

router.route("/units").get(getAllUnit);

router.route("/admin/unit/:id").put(isAuthenticatedUser, updateUnit);

router.route("/admin/unit/:id").get(getSingleUnit);

router.route("/admin/unit/:id").delete(deleteUnit);

module.exports = router;
