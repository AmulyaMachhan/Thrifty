import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.jwt;

  if (!token) {
    res.status(400).json({ message: "Unauthorized Access" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.userID).select("-password");

    if (!user) {
      res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access" });
    throw new Error("Unauthorized access");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an admin" });
  }
};

export { authenticate, authorizeAdmin };
