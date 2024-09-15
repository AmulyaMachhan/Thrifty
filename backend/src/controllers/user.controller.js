import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const registerUser = asyncHandler(async (req, res) => {
  //Extract data from request
  const { username, email, password } = req.body;

  //Validate data
  if (username == "" || password == "" || email == "") {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Find if there is an existing user
  const existingUser = await User.findOne({ email });

  //Throw Error is there is an existing user
  if (existingUser) {
    return res.status(400).json({ message: "User Already Registered" });
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
    return res.status(200).json({
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
  if (email === "" || password === "") {
    return res.status(400).json({ message: "Email and password required" });
  }

  //Find if there is an existing user
  const existingUser = await User.findOne({ email });

  //Throw error if not
  if (!existingUser) {
    return res.status(404).json({ message: "User not registered" });
  }

  //Validate if the password is correct
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  //Throw if incorrect password
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Password Invalid" });
  }

  //Create Token
  createToken(res, existingUser._id);

  // Return response
  return res.status(200).json({
    _id: existingUser._id,
    email: existingUser.email,
    username: existingUser.username,
    isAdmin: existingUser.isAdmin,
  });
});

const logoutUser = asyncHandler((req, res) => {
  // Remove the JWT cookie by setting it with an empty value and expiration in the past
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  // Return a success response
  res.status(200).json({ message: "User successfully logged out" });
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req?.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(401).send("User not found");
  }

  try {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      //Generate salt rounds for bcrypt
      const salt = await bcrypt.genSalt(10);

      //Hash password for secrecy
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error while updating user profile");
  }
});

//Admin controller
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  if (user.isAdmin) {
    return res.status(400).json({ message: "Admin cannot be deleted" });
  }

  await User.deleteOne(user._id);
  return res.status(200).json({ message: "User Deleted Successfully" });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    return res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).send("User not found");
  }

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  user.isAdmin = Boolean(req.body.isAdmin) || user.isAdmin;

  const updatedUser = await user.save();

  return res.status(200).json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUserProfile,
  getAllUsers,
  updateCurrentUserProfile,
  deleteUser,
  getUserById,
  updateUserById,
};
