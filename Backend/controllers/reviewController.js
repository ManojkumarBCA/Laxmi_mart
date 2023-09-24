const Review = require("../models/reviewModel");
const bodyParser = require("body-parser");
const express = require("express");
const reviewModel = require("../models/reviewModel");
const app = express();
app.use(bodyParser.json());

//==============================REVIEW=====================================//

//Create New Review
exports.createReview = async (req, res, next) => {
  try {
    let body = JSON.parse(JSON.stringify(req.body));
    let { product, comment, rating } = body;
    let reviewData = {
      product,
      comment,
      rating: Number(rating),
      user: req.user._id,
    };
    const saveData = await reviewModel.create(reviewData);
    res.status(201).send({ status: true, message: "Success", data: saveData });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Please Enter Review <=1 / >=5 😊!!",
    });
  }
};


// Get logged in user  Review
exports.myReview = async (req, res, next) => {
  const review = await Review.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    review,
  });
};

exports.getReviewsByProductId = async (req, res) => {
 try {
   const productId = req.params.product;
   const reviews = await Review.find({ Product: productId });

   res.status(200).json(reviews);
 } catch (error) {
   console.error(error);
   res.status(500).json({ error: "Server error" });
 }

};

// Get All Review
exports.getAllReview = async (req, res, next) => {
  try {
    const review = await Review.find();
    res.status(200).json({
      success: true,
      review,
    });
  } catch (err) {
     res.status(500).json({ error: "Server error" });
 }
};

//Update Review
exports.updateReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const reviewId = req.params.id;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE /api/reviews/:id
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return next(new ErrorHandler("Review not found with this Id", 404));
    }

    // await order.remove();
    res.status(200).json({
      success: true,
    });
  } catch (err) {
     res.status(500).json({ message: "Not Able to Delete Review" });
  }
};

// //GET /api/reviews?product=:productId
// exports.getReviewsByProduct = async (req, res) => {
//   try {
//     const reviews = await Review.find({ product: req.query.product });
//     res.json(reviews);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// //Get All Reviews of a product
// exports.getProductReviews = async (req, res, next) => {
//   const reviewProduct = await ReviewProduct.findById(req.query.id);
//   if (!reviewProduct) {
//     return next(new ErrorHandler("Review not found, 404"));
//   }
//   res.status(200).json({
//     success: true,
//     reviews: reviewProduct.reviews,
//   });
// };

// //Delete Review
// exports.deleteReview = async (req, res, next) => {
//   const reviewProduct = await ReviewProduct.findById(req.query.productId);
//   if (!reviewProduct) {
//     return next(new ErrorHandler("Product not found, 404"));
//   }
//   const reviews = reviewProduct.reviews.filter(
//     (rev) => rev._id.toString() !== req.query.id.toString()
//   );
//   let avg = 0;
//   reviews.forEach((rev) => {
//     avg += rev.rating;
//   });
//   const ratings = avg / reviews.length;
//   const numOfReviews = reviews.length;
//   await Product.findByIdAndUpdate(
//     req.query.productId,
//     {
//       reviews,
//       ratings,
//       numOfReviews,
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
