import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getSelf,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// BASE URL: /api/users
router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getSelf)
  .put(protect, updateUser)
  .delete(protect, deleteUser);
router.get("/profile/:userId", getUser);

export default router;
