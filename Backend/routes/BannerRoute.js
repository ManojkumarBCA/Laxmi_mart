const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  CreateBanner,
  getAllBanner,
  updateBanner,
  deleteBanner,
  getSingleBanner,
} = require("../controllers/BannerController");
const { isAuthenticatedUser } = require("../middleware/auth");
const imgConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Backend/public/Banner");
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
  .route("/admin/banner/new")
  .post(upload.single("imageBanner"),isAuthenticatedUser, CreateBanner);

router.route("/banners").get(getAllBanner);

router.route("/banner/:id").get(getSingleBanner);

router
  .route("/admin/banner/:id")
  .put(upload.single("imageBanner"),isAuthenticatedUser, updateBanner);

router.route("/admin/banner/:id").delete(deleteBanner);

module.exports = router;
