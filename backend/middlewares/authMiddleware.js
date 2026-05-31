import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // Check if the token exists in the request header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from "Bearer <atoken>"
      token = req.headers.authorization.split(" ")[1];

      // Verify it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach suer to request (without password)
      req.user = await User.findById(decoded.id).select("-password");

      next(); //move to the actual route
    } catch (err) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, token failed" });
  }
};


