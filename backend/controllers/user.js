import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user)
      return res.json({
        success: false,
        message: "User already exists",
      });

    const hashedPassword = await bcryptjs.hash(password, 10);

    user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Registered Successfully",
      });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in adding User",
      err: error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid Email and Password",
      });

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch)
      return res.json({
        success: false,
        message: "Invalid Email and Password",
      });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .json({
        success: true,
        message: `Welcome back, ${user.name}`,
      });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in Logging in User",
      err: error,
    });
  }
};

export const getInfo = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      maxAge: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};
