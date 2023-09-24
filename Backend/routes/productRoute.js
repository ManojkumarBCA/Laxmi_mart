const express = require("express");
const router = express.Router();
const multer = require("multer");
const valid = require("../middleware/validation");
let fs = require("fs");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

//Multer
const imgConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Backend/public/Product");
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
  fileFilter: isImage,
});

const imagUpload = upload.fields([
  { name: "titleImage", maxCount: 1 },
  { name: "image", maxCount: 20 },
]);
router.route("/products").get(getAllProducts);

router
  .route("/product/new")
  .post(imagUpload, valid.validProduct, isAuthenticatedUser, createProduct);
router
  .route("/product/:id")
  .put(imagUpload, isAuthenticatedUser, updateProduct);

router.route("/product/:id").delete(deleteProduct);

router.route("/product/:id").get(getProductDetails);

module.exports = router;
