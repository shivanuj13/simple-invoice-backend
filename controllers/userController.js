const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

var saltRound = process.env.SALT_ROUND;
saltRound = parseInt(saltRound);
const secretKey = process.env.SECRET_KEY;

const signUp = async (req, res, next) => {
  const { email, name, password, mobile, address, logoUrl } = req.body;
  (req.body);
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next({
        status: 403,
        message: "User Already Exists!",
      });

      //encrypt password
    }
    (saltRound);
    const encryptedPassword = await bcrypt.hash(password, saltRound);

    //add to database

    const result = await userModel.create({
      email,
      name,
      password: encryptedPassword,
      mobile,
      address,
      logoUrl,
    });
    // generate jwt
    const token = jwt.sign({ email, id: result._id }, secretKey);
    // send response
    return res.status(201).json({
      status: true,
      data: {
        message: "User created successfully!",
        user: result,
        token,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  // check for user
  const user = await userModel.findOne({ email });
  if (!user) {
    return next({
      status: 404,
      message: "User not found for this email!",
    });
  }
  //match password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return next({
      status: 401,
      message: "Wrong Password!",
    });
  }
  // generate token
  (secretKey);
  const token = jwt.sign({ email: email, id: user._id }, secretKey);

  return res.json({
    status: true,
    data: {
      message: "signed in successfully",
      user,
      token,
    },
    error: null,
  });
};

const update = async (req, res, next) => {
  (req.body);
  const id = req.id;

  const { email, name, logoUrl, address, mobile } = req.body;
  try {
    const user = await userModel.findByIdAndUpdate(
      id,
      { $set: { email, name, logoUrl, address, mobile } },
      { new: true }
    );
    if (!user) {
      return next({
        status: 404,
        message: "User not found!",
      });
    }
    return res.json({
      status: true,
      data: {
        message: "User updated successfully",
        user,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn, update };
