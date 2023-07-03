import express from "express";
import {
  getBlog,
  getBlogs,
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all", getAllBlogs);

router.route("").get(protect, getBlogs).post(protect, createBlog);
router
  .route("/:blogId")
  .get(getBlog)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

// Comments routes
router
  .route("/:blogId/comments")
  .get(protect, getComments)
  .post(protect, addComment);
router
  .route("/:blogId/comments/:commentId")
  .put(protect, updateComment)
  .delete(protect, deleteComment);

export default router;
