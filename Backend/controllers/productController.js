const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());

// create product --Admin
exports.createProduct = async (req, res, next) => {
  try {
    const body = JSON.parse(JSON.stringify(req.body));
    const titleImage = req.files.titleImage[0].filename;
    const image = req.files.image.map((file) => file.filename);
    const {
      name,
      description,
      price,
      category,
      subcategory,
      Brand,
      productUnit,
      Stock,
      attributeType,
      status,
      createdAt,
    } = body;

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res
        .status(409)
        .send({ status: false, msg: "This Product already exists." });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      subcategory,
      Brand,
      productUnit,
      Stock,
      titleImage,
      image,
      attributeType,
      status,
      createdAt,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// //Get All Products

//Get All Products
exports.getAllProducts = async (req, res, next) => {
  try {
    const { brand, category, subcategory } = req.query;
    const filters = {};

    if (brand) {
      filters.Brand = brand;
    }
    if (category) {
      filters.category = category;
    }
    if (subcategory) {
      filters.subcategory = subcategory;
    }

    const productCount = await Product.countDocuments(filters);
    const products = await Product.find(filters);
    const reversedProduct = products.reverse();

    res.status(200).json({
      success: true,
      product: reversedProduct,
      products,
      productCount,
    });
  } catch (err) {
    res.status(400).json({ message: "Not Able to Get Product Details" });
  }
};

// exports.getAllProducts = async (req, res, next) => {
//   try {
//     // const resultPerPage = 5;
//     const productCount = await Product.countDocuments();
//     const products = await Product.find(req.body);
//     // Reverse the order of the subCategory array
//     const reversedProduct = products.reverse();
//     // const apiFeature = new ApiFeatures(Product.find(), req.query)
//     //   .search()
//     //   .filter()
//     //   .pagination(resultPerPage);
//     // const products = await apiFeature.query;
//     res.status(200).json({
//       success: true,
//       product: reversedProduct,
//       products,
//       productCount,
//     });
//   } catch (err) {
//     res.status(400).json({ message: "Not Able to Get Product Details" });
//   }
// };

// get product Details
exports.getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Product not Found",
      error,
    });
  }
};

// Update Product

exports.updateProduct = async (req, res, next) => {
  try {
    const body = JSON.parse(JSON.stringify(req.body));
    const { id } = req.params;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).send({ status: false, msg: "Product not found." });
    }

    // Extract the fields that can be updated individually
    const {
      name,
      description,
      price,
      category,
      subcategory,
      Brand,
      productUnit,
      Stock,
      attributeType,
      status,
    } = req.body;

    const updateFields = {
      name,
      description,
      price,
      category,
      subcategory,
      Brand,
      productUnit,
      Stock,
      attributeType,
      status,
    };
    // Update the titleImage field only if a new file is uploaded
    if (req.files.titleImage && req.files.titleImage.length > 0) {
      updateFields.titleImage = req.files.titleImage[0].filename;
    }

    // Update the image field only if new files are uploaded
    if (req.files.image && req.files.image.length > 0) {
      updateFields.image = req.files.image.map((file) => file.filename);
    }
    // Perform the update using $set operator to only modify specified fields
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// exports.updateProduct = async (req, res, next) => {
//   try {
//     const body = JSON.parse(JSON.stringify(req.body));
//     const titleImage = req.files.titleImage
//       ? req.files.titleImage[0].filename
//       : "";
//     const image = req.files.image
//       ? req.files.image.map((file) => file.filename)
//       : [];
//     console.log(titleImage.length);
//     const {
//       name,
//       description,
//       price,
//       category,
//       subcategory,
//       Brand,
//       productUnit,
//       Stock,
//       attributeType,
//       status,
//     } = body;

//     const existingProduct = await Product.findOne({ name });
//     if (existingProduct && existingProduct._id != req.params.id) {
//       return res
//         .status(409)
//         .send({ status: false, msg: "This Product already exists." });
//     }

//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         name,
//         description,
//         price,
//         category,
//         subcategory,
//         Brand,
//         productUnit,
//         Stock,
//         attributeType,
//         status,
//         titleImage,
//         image,
//       },
//       { new: true }
//     );

//     res.status(201).json({
//       success: true,
//       product,
//     });
//   } catch (err) {
//     res.status(500).send({ status: false, msg: err.message });
//   }
// };
//Delete Product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
  } catch (err) {
    res.status(500).send({
      message:
        "Product not Found With this id, Please Enter Correct Product Id",
    });
  }
};

// //===============================REVIEW=====================================//

// //Create New Review or Update the review
// exports.createProductReview = async (req, res, next) => {
//   const { rating, productId, comment } = req.body;
//   const review = {
//     user: req.user._id,
//     name: req.user.fname + " " + req.user.lname,
//     rating: Number(rating),
//     comment,
//   };
//   const product = await Product.findById(productId);
//   let reviewInserted = false;
//   product.reviews.forEach((rev) => {
//     if (rev.user.toString() == req.user._id.toString()) {
//       console.log("rev");
//       rev.rating = rating;
//       rev.comment = comment;
//       reviewInserted = true;
//     }
//   });
//   if (!reviewInserted) {
//     product.reviews.push(review);
//   }
//   product.= product.reviews.length;
//   let avg = 0;
//   product.reviews.forEach((rev) => {
//     avg += rev.rating;
//   });
//   product.= avg / product.reviews.length;
//   await product.save({ validateBeforeSave: false });
//   res.status(200).json({
//     success: true,
//     reviews: product,
//   });
// };

// //Get All Reviews of a product
// exports.getProductReviews = async (req, res, next) => {
//   const product = await Product.findById(req.query.id);
//   if (!product) {
//     return next(new ErrorHandler("Product not found, 404"));
//   }
//   res.status(200).json({
//     success: true,
//     reviews: product.reviews,
//   });
// };

// //Delete Review
// exports.deleteReview = async (req, res, next) => {
//   const product = await Product.findById(req.query.productId);
//   if (!product) {
//     return next(new ErrorHandler("Product not found, 404"));
//   }
//   const reviews = product.reviews.filter(
//     (rev) => rev._id.toString() !== req.query.id.toString()
//   );
//   let avg = 0;
//   reviews.forEach((rev) => {
//     avg += rev.rating;
//   });
//   const = avg / reviews.length;
//   const = reviews.length;
//   await Product.findByIdAndUpdate(
//     req.query.productId,
//     {
//       reviews,
//
//
//     },
//     {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     }
//   );
//   res.status(200).json({
//     success: true,
//   });
// };
