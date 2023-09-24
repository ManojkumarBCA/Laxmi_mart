const express = require("express");
const router = express.Router();
const multer = require("multer");
const valid = require("../middleware/validation");

const {
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  registerUser,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  // updateUserRole,
  deleteUser,
  updateSingleUserById,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

const imgConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Backend/public/UserAvatar");
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
  .route("/register")
  .post(upload.single("avatar"), valid.validUser, registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/profile").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router
  .route("/profile/update")
  .put(upload.single("avatar"), isAuthenticatedUser, updateProfile);

router
  .route("/admin/update/user/:id")
  .put(upload.single("avatar"), isAuthenticatedUser, updateSingleUserById);

router.route("/admin/users").get(getAllUser);

router.route("/admin/user/:id").get(getSingleUser);

// router.route("/admin/user/:id").put(isAuthenticatedUser, updateUserRole);

router.route("/admin/user/:id").delete(deleteUser);

module.exports = router;
