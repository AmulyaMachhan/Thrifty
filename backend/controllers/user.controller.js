import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const registerUser = asyncHandler(async (req, res) => {
  //Extract data from request
  const { username, password, email } = req.body;

  //Validate data
  if (username == "" || password == "" || email == "") {
    throw new Error("All fields are required");
  }

  //Find if there is an existing user
  const existingUser = await User.findOne({ email });

  //Throw Error is there is an existing user
  if (existingUser) {
    res.status(400).send("User Already Registered");
  }

  //Generate salt rounds for bcrypt
  const salt = await bcrypt.genSalt(10);

  //Hash password for secrecy
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create a user model to be stored in database
  const user = new User({
    username,
    password: hashedPassword,
    email,
  });

  try {
    // Save user model
    await user.save();

    //Creating and for storing token in the cookies
    createToken(res, user._id);

    // Return response
    res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "Invalid User Data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  //Extract fields from request body
  const { email, password } = req.body;

  //Validate fields
  if (!email || !password) {
    throw new Error("Email and password required");
  }

  //Find if there is an existing user
  const existingUser = await User.findOne({ email });

  //Throw error if not
  if (!existingUser) {
    throw new Error("User not registered");
  }

  //Validate if the password is correct
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  //Throw if incorrect password
  if (!isPasswordValid) {
    throw new Error("Password Invalid");
  }

  //Create Token
  createToken(res, existingUser._id);

  // Return response
  res.status(200).json({
    _id: existingUser._id,
    email: existingUser.email,
    username: existingUser.username,
    isAdmin: existingUser.isAdmin,
  });
});

const logoutUser = asyncHandler((req, res) => {
  //Remove cookies set
  res.clearCookie("jwt", {
    httpOnly: true,
    expires: new Date(0),
  });

  //Return a response
  res.status(200).json({ message: "User Successfully Logged Out" });
});

//Admin controller
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
});

export { registerUser, loginUser, logoutUser, getAllUsers };
