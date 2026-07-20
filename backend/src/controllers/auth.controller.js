import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function signToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });
}

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email: String(email).toLowerCase().trim() });
  const isValid = user ? await user.comparePassword(password) : false;

  if (!isValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  res.json({
    success: true,
    token: signToken(user),
    user: user.toSafeJSON()
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: "Logged out"
  });
});

export const me = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: req.user.toSafeJSON()
  });
});
