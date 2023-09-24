const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");
const path = require("path");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
/*cors handling*/
app.use(cors());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const publicFolderPath = path.join(__dirname, "public");
app.use(express.static(publicFolderPath));

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const prodCategory = require("./routes/CategoryRoute");
const prodSubCategory = require("./routes/SubCategoryRoute");
const adminLogin = require("./routes/loginRoute");
const shipAddress = require("./routes/delAddRoute");
const banner = require("./routes/BannerRoute");
const brand = require("./routes/BrandRoute");
const contactUs = require("./routes/ContactUsRoute");
const shopUs = require("./routes/ShopUsRoute");
const privacyPolicy = require("./routes/PrivacyPolicyRoute");
const returnPolicy = require("./routes/ReturnPolicyRoute");
const terms = require("./routes/TermsRoute");
const about = require("./routes/AboutRoute");
const unit = require("./routes/UnitProdRoute");
const productReview = require("./routes/reviewRoute");
const cart = require("./routes/cartRoute");
const coupon = require("./routes/CouponRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", prodCategory);
app.use("/api/v1", prodSubCategory);
app.use("/api/v1", adminLogin);
app.use("/api/v1", shipAddress);
app.use("/api/v1", banner);
app.use("/api/v1", brand);
app.use("/api/v1", contactUs);
app.use("/api/v1", shopUs);
app.use("/api/v1", privacyPolicy);
app.use("/api/v1", returnPolicy);
app.use("/api/v1", terms);
app.use("/api/v1", about);
app.use("/api/v1", unit);
app.use("/api/v1", productReview);
app.use("/api/v1", cart);
app.use("/api/v1", coupon);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
