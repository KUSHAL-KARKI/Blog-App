import { User } from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from "../middleware/errorHandler.js";
import { AuthValidator } from "../middleware/authValidator.js";

// signup route
export const signup = async (req, res, next) => {
  try {
    const result = AuthValidator.safeParse(req.body);
    if (!result.success) {
      return next(
        new BadRequestError(result.error.issues[0].message)
      );
    }
    const { username, password } = result.data;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new BadRequestError("Username already exists");
    }

    const user = new User({ username, password, role: "user" });
    await user.save();

    res.status(201).json({ success: true, message: "Signup success" });
  } catch (error) {
    next(error);
  }
};


//login routes

export const login = async (req, res, next) => {
  try {

      const result = AuthValidator.safeParse(req.body);
    if (!result.success) {
      return next(
        new BadRequestError(result.error.issues[0].message)
      );
    }
    const { username, password } = result.data;
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
      secure: process.env.NODE_ENV === "production",
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
