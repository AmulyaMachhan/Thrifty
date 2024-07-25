import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import bcrypt from "bcryptjs";

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

export { registerUser };
