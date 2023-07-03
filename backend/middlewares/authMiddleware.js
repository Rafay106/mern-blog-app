import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  try {
    let token;
    token = req.cookies.jwt;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token!");
    } else {
      try {
        let userId = jwt.verify(token, "secret").userId;
        req.user = await User.findById(userId).select("-password");
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, invalid token!");
      }
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

export { protect };
