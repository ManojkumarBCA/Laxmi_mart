const ErrorHandler = require("../utils/errorhandler");
const User = require("../models/userModel");
const sendToken = require("../utils/jwrToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Register a User
exports.registerUser = async (req, res) => {
  try {
    const image = req.file;
    const { fname, lname, email, mobile, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .send({ status: false, msg: "This User already exists." });
    }
    const user = await User.create({
      fname,
      lname,
      email,
      mobile,
      password,
      avatar: image.filename,
    });
    const token = user.getJWTToken();
    res.status(201).json({
      success: true,
      token: token,
      user,
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//Login User
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //checking if user as given password and email both
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email and Password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or Password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or Password", 401));
    }
    sendToken(user, 200, res);
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//User Logout
exports.logout = async (req, res, next) => {
  try {
    console.log("logout");
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//Forgot Password
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  //User Reset Password Token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email than please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Laxmi Mart Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
};

// Reset Password
exports.resetPassword = async (req, res, next) => {
  try {
    //creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(
        new ErrorHandler(
          "Reset Password Token is Invalid has been expired",
          404
        )
      );
    }
    if (req.body.password != req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not password", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//get Customer details
exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//Update Customer Password Using Old Password
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("old Password is incorrect", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler(" Password does not match", 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//Update Customer Profile
exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        fname: req.body.fname,
        lname: req.body.lname,
        mobile: req.body.mobile,
        avatar: req.file.filename,
      },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get All Customer
exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    const reversedUser = users.reverse();
    res.status(200).json({
      success: true,
      message: "All Category Find",
      users: reversedUser,
      users,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get Single User
exports.getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
      );
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Update Single User
exports.updateSingleUserById = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id != req.params.id) {
      return res
        .status(409)
        .send({ status: false, msg: "This User already exists." });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        avatar: req.file.filename,
      },
      { new: true }
    );
    // if (!user) {
    //   return next(
    //     new ErrorHandler(`User does not exist with Id: ${req.body.id}`)
    //   );
    // }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//=============================================================================================================
//Update User Role --Admin
exports.updateUserRole = async (req, res, next) => {
  const newUserData = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
};

//=============================================================================================================

//Delete User
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with id: ${req.params.id}`)
      );
    }
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
