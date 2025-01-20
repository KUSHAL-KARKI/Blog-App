import { User } from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// signup route
export const signup = async (req, res) => {
  console.log("req received");
  const { username, password } = req.body;
  console.log(password);

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "username already exist" });
    }
    const user = new User({ username, password, role: "user" });
    await user.save();
    res.status(201).json({ success: true, message: "signup success" });
    console.log("signup successful");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//login routes

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: "invalid user" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "username or password not match " });
    }
    console.log("valid password");
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
    return res
      .status(200)
      .json({
        success: true,
        loggedIn: true,
        message: "login success",
        role: user.role,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  return res.status(200).json({ message: "Logged out successfully" });
};
