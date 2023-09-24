const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  CreateNewCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
} = require("../controllers/CategoryController");
const { isAuthenticatedUser } = require("../middleware/auth");
const imgConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Backend/public/Category");
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}.${file.originalname}`);
  },
});
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only image is Allow"), false);
  }
};
const upload = multer({
  storage: imgConfig,
  fileFilter: isImage,
});
router
  .route("/admin/category/new")
  .post(upload.single("imageCategory"), isAuthenticatedUser, CreateNewCategory);
router.route("/category").get(getAllCategory);

router.route("/admin/category/:id").get(getSingleCategory);
router
  .route("/admin/category/:id")
  .put(upload.single("imageCategory"), isAuthenticatedUser, updateCategory);
router.route("/admin/category/:id").delete(deleteCategory);
module.exports = router;
