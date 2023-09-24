const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  CreateNewSubCategory,
  getAllSubCategory,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/SubCategoryController");
const { isAuthenticatedUser } = require("../middleware/auth");

const imgConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Backend/public/SubCategory");
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}.${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only image is Allow"));
  }
};

const upload = multer({
  storage: imgConfig,
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
  fileFilter: isImage,
});

router
  .route("/admin/subcategory/new")
  .post(upload.single("image"), isAuthenticatedUser, CreateNewSubCategory);

router.route("/subcategory").get(getAllSubCategory);

router.route("/admin/subcategory/:id").get(getSingleSubCategory);

router
  .route("/admin/subcategory/:id")
  .put(upload.single("image"), isAuthenticatedUser, updateSubCategory);

router
  .route("/admin/subcategory/:id")
  .delete(deleteSubCategory);

module.exports = router;
