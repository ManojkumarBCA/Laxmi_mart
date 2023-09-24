const express = require("express");
const router = express.Router();
const multer = require("multer");
const valid = require("../middleware/validation");

const {} = require("../controllers/CategoryController");

const {
  createNewBrand,
  getAllBrand,
  getSingleBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/BrandController");
const { isAuthenticatedUser } = require("../middleware/auth");
const imgConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Backend/public/Brand");
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}.${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only image/png is Allow"), false);
  }
};

const upload = multer({
  storage: imgConfig,
  fileFilter: isImage,
});

router
  .route("/admin/brand/new")
  .post(upload.single("imageBrand"), isAuthenticatedUser, createNewBrand);

router.route("/brands").get(getAllBrand);

router.route("/brand/:id").get(getSingleBrand);

router
  .route("/admin/brand/:id")
  .put(upload.single("imageBrand"), isAuthenticatedUser, updateBrand);

router.route("/admin/brand/:id").delete(deleteBrand);

module.exports = router;
