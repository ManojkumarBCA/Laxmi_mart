const bodyParser = require("body-parser");
const express = require("express");
const ContactUs = require("../models/ContactUsModel");
const app = express();
app.use(bodyParser.json());

//Create new order
exports.newContactUs = async (req, res, next) => {
  try {
    let body = JSON.parse(JSON.stringify(req.body));
    let { address, email, contNo, GoogleLink } = body;
    let contactData = {
      address,
      email,
      contNo,
      GoogleLink,
      // user: req.user._id,
    };
    const saveData = await ContactUs.create(contactData);
    res.status(201).send({ status: true, message: "Success", data: saveData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }

  //   try {

  //     const { address, email, contNo, GoogleLink } = req.body;
  //   const about = await ContactUs.create({
  //     address,
  //     email,
  //     contNo,
  //     GoogleLink,
  //   });
  //   res.status(201).json({
  //     success: true,
  //     about,
  //   });
  //   } catch (err) {
  //     res.status(500).send({ message:"Not Able to Create"});
  //  }
};

// // Get Single Order
// exports.getContactUs = async (req, res, next) => {
//   const contactUs = await ContactUs.findById(req.params.id)("fname ,email");
//   if (!contactUs) {
//     return next(new ErrorHandler("Contact Us not found with this id", 404));
//   }
//   res.status(200).json({
//     success: true,
//     contactUs,
//   });
// };

// Get All Contact
exports.getSingleContactUs = async (req, res, next) => {
  const contactUs = await ContactUs.findById(req.params.id);
  res.status(200).json({
    success: true,
    message: "Contact Us Find",
    contactUs,
  });
};

// Get All Contact
exports.getAllContactUs = async (req, res, next) => {
  const contactUs = await ContactUs.find(req.body);
  const contactUSCount = await ContactUs.countDocuments();
  res.status(200).json({
    success: true,
    contactUSCount,
    message: "All Contact Us Find",
    contactUs,
  });
};

// Update Contact Us Status --Admin
exports.updateContactUs = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const result = await ContactUs.findByIdAndUpdate(id, updates);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

// // Delete  Order --Admin
// exports.deleteContactUs = async (req, res, next) => {
//   const contactUs = await ContactUs.findByIdAndDelete(req.params.id);

//   if (!contactUs) {
//     return next(new ErrorHandler("Contact Us not found with this Id", 404));
//   }

//   // await order.remove();
//   res.status(200).json({
//     success: true,
//   });
// };
