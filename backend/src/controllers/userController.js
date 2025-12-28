import { User } from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from "../middleware/errorHandler.js";

// signup route
export const signup = async (req, res, next) => {
  try {
    console.log("req received");
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new BadRequestError("Username already exists");
    }
    const user = new User({ username, password, role: "user" });
    await user.save();
    res.status(201).json({ success: true, message: "signup success" });
    console.log("signup successful");
  } catch (error) {
    next(error);
  }
};

//login routes

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new UnauthorizedError("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError("Invalid password");
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      loggedIn: true,
      message: "login success",
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

// Verify auth endpoint
export const verifyAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      throw new UnauthorizedError("User not found");
    }
    return res.status(200).json({
      success: true,
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
