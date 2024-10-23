import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    res.status(400).json({
      success: false,
      message: "Login First",
    });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);
  next();
};

export { isAuthenticated };
